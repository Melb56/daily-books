import Google from 'next-auth/providers/google';

const authConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

export default authConfig;