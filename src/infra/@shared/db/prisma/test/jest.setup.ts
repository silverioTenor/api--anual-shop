import { prisma } from '../client';

afterEach(async () => {
   await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "address", "users" RESTART IDENTITY CASCADE`,
   );
});

export { prisma };
