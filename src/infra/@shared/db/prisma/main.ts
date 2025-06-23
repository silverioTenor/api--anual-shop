import { prisma as prismaClient } from '@infra/@shared/db/prisma/client';
import { prisma as prismaTest } from '@infra/@shared/db/prisma/test/jest.setup';
import { config } from '@infra/@shared/config/config';

const prisma = config.env !== 'test' ? prismaClient : prismaTest;

export { prisma };
