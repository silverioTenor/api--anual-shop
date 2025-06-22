import 'dotenv/config';

const getEnv = (key: string, required = false) => {
   const envVar = process.env[key];

   if (!envVar && required) {
      throw new Error(`Environment variable ${key} is not defined!`);
   }

   return envVar;
}

export const env = {
   NODE_ENV: getEnv('NODE_ENV') || 'development',
   HOST: getEnv('HOST') || 'localhost',
   PORT: getEnv('PORT') || 3000,
   DATABASE_URL: getEnv('DATABASE_URL', true),
   DATABASE_TEST_URL: getEnv('DATABASE_TEST_URL', true),
   PRISMA_MIGRATE_DEV: getEnv('PRISMA_MIGRATE_DEV', true),
   DOCKER_COMPOSE_TEST_UP: getEnv('DOCKER_COMPOSE_TEST_UP', true),
   DOCKER_COMPOSE_TEST_DOWN: getEnv('DOCKER_COMPOSE_TEST_DOWN', true)
}