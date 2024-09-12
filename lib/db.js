import mongoose from 'mongoose';

/** Connects to Mongo DB */
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (e) {
        console.error(e);
    }
};

const messageSchema = new mongoose.Schema({
    author: Array,
    content: String,
    date: String
});

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    lastMessage: Number,
})

export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);