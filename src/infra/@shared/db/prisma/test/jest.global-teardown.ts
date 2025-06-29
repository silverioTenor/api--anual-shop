import 'tsconfig-paths/register';
import { prisma } from '../client';
import PresetTest from './preset';
import { config } from '@infra/@shared/config/config';

const dbName = 'test_anual_shop';
const dockerDown = config.test.docker.down || '';

export default async () => {
   await prisma.$disconnect();
   await PresetTest.dropDB(dbName);

   await PresetTest.docker(dockerDown, {
      start: '⏳ removing container...',
      finish: '✅ container removed!',
   });
};
