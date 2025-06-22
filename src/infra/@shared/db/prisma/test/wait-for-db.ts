import { Client } from 'pg';
import { config } from '@infra/@shared/config/config';

export async function waitForDB(timeout = 10000) {
   const start = Date.now();

   while (Date.now() - start < timeout) {
      try {
         const client = new Client({ connectionString: config.db.url });

         await client.connect();
         await client.end();

         console.log('✅ Database is ready');
         return;
      } catch (err) {
         console.log('⏳ Waiting for database...' + err);
         await new Promise(res => setTimeout(res, 500));
      }
   }

   throw new Error('❌ Database did not start in time');
}
