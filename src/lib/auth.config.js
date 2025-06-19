// import Google from 'next-auth/providers/google';
// import NextAuth from "next-auth";

// const authConfig = {
//     providers: [
//         Google({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//         })
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
// };

// export default authConfig;

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
});

export default handler;