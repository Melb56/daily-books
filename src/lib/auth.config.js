import Google from 'next-auth/providers/google';

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    secret: process.env.AUTH_SECRET,
};

export default authConfig;