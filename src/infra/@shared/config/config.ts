import { env } from './env';

type Environment = 'development' | 'production' | 'test' | 'build';

const nodeEnv = env.NODE_ENV as Environment;

export const config = {
   env: nodeEnv,
   app: {
      port: env.PORT,
      host: env.HOST,
      protocol: env.PROTOCOL,
      url: env.APP_URL,
   },
   auth: {
      jwt: {
         secret: env.AUTH_JWT_SECRET,
         expiresIn: env.AUTH_JWT_EXPIRES_IN,
         algorithm: env.AUTH_JWT_ALGORITHM,
      },
      bcrypt: {
         salt: env.AUTH_BCRYPT_SALT,
      }
   },
   db: {
      url: nodeEnv !== 'test' ? env.DATABASE_URL : env.DATABASE_TEST_URL,
      prisma: {
         migrate: {
            deploy: env.PRISMA_MIGRATE_DEV,
         },
      },
   },
   test: {
      docker: {
         containerName: env.DOCKER_CONTAINER_NAME,
         up: env.DOCKER_COMPOSE_TEST_UP,
         down: env.DOCKER_COMPOSE_TEST_DOWN,
      },
   },
   mailtrap: {
      apiKey: env.MAILTRAP_API_KEY,
      useSandbox: env.MAILTRAP_USE_SANDBOX,
      inboxId: env.MAILTRAP_INBOX_ID,
      sender: env.MAILTRAP_SENDER,
   },
};
