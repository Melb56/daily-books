import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { prisma };


// const globalForPrisma = globalThis;

// let prisma;

// if (!globalForPrisma.prisma) {
//   globalForPrisma.prisma = new PrismaClient();
// }

// prisma = globalForPrisma.prisma;

// export { prisma };