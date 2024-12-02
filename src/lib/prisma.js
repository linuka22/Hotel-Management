import { PrismaClient } from '@prisma/client';

// Create a single Prisma client instance to avoid multiple connections
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };

