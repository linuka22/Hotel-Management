import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare global variable
const globalThis = {
  ...global,
  prismaGlobal: null
};

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export const db = prisma;