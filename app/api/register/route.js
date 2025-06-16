// import prisma from '@/lib/prisma';
// import bcrypt from 'bcrypt';

// export async function POST(req) {
//   try {
//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       return new Response("Tous les champs sont requis", { status: 400 });
//     }

//     // Vérifier si l'email existe déjà
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return new Response("Email déjà utilisé", { status: 400 });
//     }

//     // Hasher le mot de passe
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Créer l'utilisateur
//     await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return new Response("Utilisateur créé avec succès", { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return new Response("Erreur serveur", { status: 500 });
//   }
// }
