import { prisma } from '../client';
import PresetTest from './preset';
import { config } from '@infra/@shared/config/config';
import { waitForDB } from './wait-for-db';

const dbName = 'test_anual_shop';
const cmd = config.db.prisma.migrate.deploy || '';
const dockerUp = config.test.docker.up || '';
const dockerDown = config.test.docker.down || '';

beforeAll(async () => {
   PresetTest.docker(dockerUp, {
      start: '⏳ creating container...',
      finish: '✅ container created!',
   });

   await waitForDB();

   await PresetTest.createDB(dbName);
   PresetTest.runMigrations(cmd);
});

afterAll(async () => {
   await prisma.$disconnect();
   await PresetTest.dropDB(dbName);

   PresetTest.docker(dockerDown, {
      start: '⏳ removing container...',
      finish: '✅ container removed!',
   });
});

export { prisma };
