import prisma from '../lib/prisma.js';
import { hash } from 'bcryptjs';

async function main() {
  const email = 'admin@example.com';
  const passwordHashed = await hash('admin1234', 10);

  const user = await prisma.user.create({
    data: {
      email,
      name: 'Admin',
      password: passwordHashed,
      role: 'ADMIN',
    },
  });

  console.log('Admin créé:', user);
}

main().catch((e) => console.error(e));