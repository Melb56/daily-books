import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/src/lib/prisma";



const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig

})

export { handlers, signIn, signOut, auth };


//   providers: [
//     // Credentials({
//     //   credentials: {
//     //     username: { label: "Username" },
//     //     password: { label: "Password", type: "password" },
//     //   },
//     //   async authorize({ request }) {
//     //     const response = await fetch(request)
//     //     if (!response.ok) return null
//     //     return (await response.json()) ?? null
//     //   },
//     // }),
//   ],
// });