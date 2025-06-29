import 'reflect-metadata';

import MapperRegistry from '@infra/@shared/config/mapper/profile-registry.mapper';
import { prisma } from '../client';

beforeAll(() => {
   MapperRegistry.regiterAll();
})

afterEach(async () => {
   await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "address", "users" RESTART IDENTITY CASCADE`,
   );
});

export { prisma };
