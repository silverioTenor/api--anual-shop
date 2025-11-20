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
   PROTOCOL: getEnv('PROTOCOL') || 'http',
   AUTH_JWT_SECRET: getEnv('AUTH_JWT_SECRET', true),
   AUTH_JWT_EXPIRES_IN: getEnv('AUTH_JWT_EXPIRES_IN') || '1h',
   AUTH_JWT_ALGORITHM: getEnv('AUTH_JWT_ALGORITHM') || 'HS256',
   AUTH_BCRYPT_SALT: Number(getEnv('AUTH_BCRYPT_SALT')) || 10,
   DATABASE_URL: getEnv('DATABASE_URL', true),
   DATABASE_TEST_URL: getEnv('DATABASE_TEST_URL', true),
   PRISMA_MIGRATE_DEV: getEnv('PRISMA_MIGRATE_DEV', true),
   DOCKER_CONTAINER_NAME: getEnv('DOCKER_CONTAINER_NAME') || 'db-postgres-test',
   DOCKER_COMPOSE_TEST_UP: getEnv('DOCKER_COMPOSE_TEST_UP', true),
   DOCKER_COMPOSE_TEST_DOWN: getEnv('DOCKER_COMPOSE_TEST_DOWN', true)
}
