import UserRepository from "@infra/aggregate/user/db/prisma/repository/user.repository";
import CreateUserUseCase from "./Create.user.usecase";

describe('Integration test for User', () => {
   it('should create a new user', async () => {
      const userRepository = new UserRepository();
      const createUserUseCase = new CreateUserUseCase(userRepository);

      const input = {
         name: 'William Silver',
         email: 'w.s@gmali.com',
         document: '12345678910',
         phone: '21999999999',
         password: 'abc123',
         address: undefined,
      };

      const outputCreateUserDTO = await createUserUseCase.execute(input);

      expect(outputCreateUserDTO).toBeDefined();
      expect(outputCreateUserDTO).toStrictEqual({ id: expect.any(String) });
   });
});
