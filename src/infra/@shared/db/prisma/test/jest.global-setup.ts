import 'tsconfig-paths/register'; 
import PresetTest from './preset';
import { config } from '@infra/@shared/config/config';
import { waitForDB } from './wait-for-db';

const dbName = 'test_anual_shop';
const dockerUp = config.test.docker.up || '';
const cmd = config.db.prisma.migrate.deploy || '';

export default async () => {
   await PresetTest.docker(dockerUp, {
      start: '⏳ creating container...',
      finish: '✅ container created!',
   });

   await waitForDB();

   await PresetTest.createDB(dbName);
   PresetTest.runMigrations(cmd);
};
