import { NextAuthOptions } from "next-auth";
import GoogleProvier from 'next-auth/providers/google';
import { checkUser, createUser } from "./actions/db-actions";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvier({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (profile?.hasOwnProperty('email') && profile?.hasOwnProperty('name')) {
                const hasAccount = await checkUser(profile.email as string);
                if (!hasAccount) {
                    await createUser({ email: profile.email!, username: profile.name!, lastMessage: Date.now() - 5000 });
                }
            } else return false;

            return true;
        }
    }
}