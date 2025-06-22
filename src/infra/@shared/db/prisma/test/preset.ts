import { Client } from 'pg';
import { execSync } from 'node:child_process';
import { config } from '@infra/@shared/config/config';

type IMessage = {
   start: string;
   finish: string;
};

export default abstract class PresetTest {
   static async createDB(dbName: string) {
      const client = new Client({
         connectionString: config.db.url,
      });

      await client.connect();
      await client.query(`CREATE DATABASE "${dbName}";`);
      await client.end();
   }

   static async dropDB(dbName: string) {
      const client = new Client({
         connectionString: config.db.url,
      });

      await client.connect();
      await client.query(`
         SELECT pg_terminate_backend(pid)
         FROM pg_stat_activity
         WHERE datname = '${dbName}' AND pid <> pg_backend_pid();
      `);

      await client.query(`DROP DATABASE IF EXISTS "${dbName}";`);
      await client.end();
   }

   static runMigrations(cmd: string) {
      console.log('⏳ start migrations...');

      execSync(cmd, {
         env: {
            ...process.env,
            DATABASE_URL: config.db.url,
         },
         stdio: 'inherit',
      });

      console.log('✅ finish migrations!');
   }

   static docker(cmd: string, msg: IMessage) {
      console.log(msg.start);

      execSync(cmd);

      console.log(msg.finish);
   }
}
