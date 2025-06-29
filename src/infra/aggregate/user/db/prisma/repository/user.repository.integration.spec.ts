import UserModel from "../model/user.model";

describe('Integration tests for user repository', () => {
   it('should create an user', async () => {
      const user = await UserModel.db.create({
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

      const foundUser = await UserModel.db.findUnique({
         where: { id: user.id },
      });

      expect(foundUser).toBeDefined();
      expect(foundUser).toStrictEqual(user);

   });
});
