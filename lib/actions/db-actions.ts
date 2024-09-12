'use server';
import { connectDB, Message, User } from "../db";
import message from "../types";

export const getMessages = async (skip?: number): Promise<message[]> => {
    // retreives 20 messages from the db with optional index
    await connectDB();
    const raw = skip !== undefined ? await Message.find().sort({ date: -1 }).skip(skip).limit(20) : await Message.find().sort({ date: -1 }).limit(20);
    const filtered: message[] = raw.map(x => {
        return {
            id: x.id,
            author: x.author,
            content: x.content,
            date: Number(x.date)
        };
    });
    return filtered.sort((a, b) => b.date - a.date);
}

export const checkUser = async (email: string): Promise<boolean> => {
    // Searches for user in db and returns true if accounts with given email are greater than 0
    await connectDB();
    const user = await User.find({ email: email });
    return user.length > 0;
}

export const getUserByEmail = async (email: string) => {
    // Gets user with the email provided
    if (await checkUser(email)) {
        await connectDB();
        return await User.findOne({ email: email });
    }
}

export const createUser = async (userInfo: { email: string; username: string; lastMessage: number; }) => {
    // Creates a new user in the db
    await connectDB();
    await User.create(userInfo);
}

export const changeUserName = async (email: string, currentName: string, newName: string) => {
    if (await checkUser(email)) { // Check if user exists
        await connectDB();
        const userInfo = await getUserByEmail(email);
        await User.updateOne({ email: email }, { username: newName }); // Update user with new name
        await Message.updateMany({ author: [email, userInfo.username] }, { author: [email, newName] }); // Updates all the users messages to have the new name

        return { status: 'success', message: `Username changed to ${newName}` }; // Return status and message to client
    }

    return { status: 'Error', message: 'Could not find you in our database.' }
}