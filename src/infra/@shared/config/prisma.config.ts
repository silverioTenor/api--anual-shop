import { defineConfig } from 'prisma/config';
import { config } from './config';

export default defineConfig({
   schema: '../db/prisma/schema.prisma',
   datasource: {
      url: config.db.url!,
   },
   migrations: {
      path: '../db/prisma/migrations',
   },
});
