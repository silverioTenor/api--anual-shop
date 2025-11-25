import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../client';
import { config } from '@infra/@shared/config/config';

const adapter = new PrismaPg({
   connectionString: config.db.url,
});

const prisma = new PrismaClient({ adapter });

export { prisma };
