import { createServer } from 'http';
import next from 'next';
import { connectDB, Message, User } from './lib/db.js';
import { Server } from 'socket.io';
import { englishDataset, englishRecommendedTransformers, RegExpMatcher } from 'obscenity';

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const filter = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
})

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected!');

        // Handle Chat Messages
        socket.on('message request', async (messageReq, cb) => {
            const jsonMessage = JSON.parse(messageReq); // Message is received as string and needs to be converted.

            // Check if user is not logged in
            await connectDB();
            const user = await User.find({ email: jsonMessage.email });
            if (user.length === 0) {
                cb({ status: 'Error', message: 'Your account does not exist' });
                return;
            }

            // Check time of last message and throw error if less than 5 seconds from new message
            if (Math.floor((Date.now() - user[0].lastMessage) / 1000) < 5) {
                cb({ status: 'Error', message: 'Must wait 5 seconds between messages' });
                return;
            }
            await User.updateOne({ email: jsonMessage.email }, { lastMessage: Date.now() }); // Update last message time

            // Check for profanity and other bad stuff
            if (filter.hasMatch(jsonMessage.content)) {
                cb({ status: 'Error', message: 'Profanity found.' });
                return;
            }

            // Store message in db
            const message = { author: [jsonMessage.email, user[0].username], content: jsonMessage.content, date: Date.now() }
            await connectDB();
            await Message.create(message);

            // Send message out to all users
            io.emit('chat message', JSON.stringify(message));
            cb({ status: 'Success' });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    httpServer
        .once('error', (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`)
        })
});