import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('motdepasse123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@dailybooks.com' },
    update: {},
    create: {
      email: 'admin@dailybooks.com',
      name: 'Mel',
      password,
      role: 'ADMIN',
    },
  });

  console.log('Admin created ✅');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());