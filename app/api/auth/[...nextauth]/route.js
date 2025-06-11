import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };





// import  NextAuth  from 'next-auth';
// import { authOptions } from '@/lib/auth';

// // const handler = NextAuth(authOptions);
// const handler = NextAuth({

// });


// export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

//   const authOptions = {
//     providers: [
//       CredentialsProvider({
//         name: "Credentials",
//         credentials: {
//           email: { label: "Email", type: "email" },
//           password: { label: "Password", type: "password" },
//         },
//         async authorize(credentials) {
//           const user = await prisma.user.findUnique({
//             where: { email: credentials.email },
//           });

          
//         if (!user) {
//           throw new Error("Email inconnu");
//         }

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) {
//           throw new Error("Mot de passe incorrect");
//         }

//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//    session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
// };
// //   pages: {
// //     signIn: "/login",
// //   },
// //   callbacks: {
// //     async session({ session, token }) {
// //       session.user.role = token.role;
// //       return session;
// //     },
// //     async jwt({ token, user }) {
// //       if (user) token.role = user.role;
// //       return token;
// //     },
// //   },
// //   session: {
// //     strategy: "jwt",
// //   },
// //   secret: process.env.NEXTAUTH_SECRET, 
// // };

//   const handler = NextAuth(authOptions);

//   export { handler as GET, handler as POST };
  // export { authOptions, handler as GET, handler as POST };

// const handler = NextAuth({
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

//         if (
//           credentials.email === user.email &&
//           credentials.password === user.password
//         ) {
//           return user;
//         }

//         return null; // sinon NextAuth renvoie une erreur
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // optionnel, redirige vers une page personnalisée
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET, // ajoute une variable d'environnement
// });

// export { handler as GET, handler as POST };
