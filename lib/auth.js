// import CredentialsProvider from 'next-auth/providers/credentials';
// import prisma from '@/lib/prisma';
// import bcrypt from 'bcryptjs';

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) throw new Error("Email inconnu");

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) throw new Error("Mot de passe incorrect");

//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//   },
// };


