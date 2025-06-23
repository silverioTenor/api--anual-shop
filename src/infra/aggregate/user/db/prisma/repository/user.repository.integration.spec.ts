import { prisma } from '@infra/@shared/db/prisma/main';

describe('Integration tests for user repository', () => {
   test('should create an user', async () => {
      const user = await prisma.users.create({
         data: {
            name: 'William Joker',
            email: 'william.j@gmail.com',
            document: '12345678910',
            phone: '21999999999',
            password: 'abc123',
         },
      });

      expect(user).toBeDefined();
      expect(user.createdAt).toBeDefined();

      const foundUser = await prisma.users.findUnique({
         where: { id: user.id },
      });

      expect(foundUser).toBeDefined();
      expect(foundUser).toStrictEqual(user);

   }, 6000);
});
