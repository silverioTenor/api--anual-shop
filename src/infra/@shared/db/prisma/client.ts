import { PrismaClient } from '../client';
import { config } from '@infra/@shared/config/config';

export const prisma = new PrismaClient({
   datasources: {
      db: {
         url: config.db.url,
      },
   },
});
