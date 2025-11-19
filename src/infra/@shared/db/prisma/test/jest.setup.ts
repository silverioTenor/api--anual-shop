import 'reflect-metadata';

import MapperRegistry from '@infra/@shared/config/mapper/profile-registry.mapper';
import { prisma } from '../client';
import { config } from '../../../config/config';

if (config.env === 'test') {
   beforeAll(() => {
      MapperRegistry.regiterAll();
   });

   afterEach(async () => {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "address", "users" RESTART IDENTITY CASCADE`);
   });
}

export { prisma };
