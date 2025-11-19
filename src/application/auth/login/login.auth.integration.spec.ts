import { Jwt } from "@infra/@shared/helper/jwt";
import UserRepository from "@infra/aggregate/user/db/prisma/repository/user.repository";
import CreateUserUseCase from "../../user/create/Create.user.usecase";
import LoginUseCase from "./login.auth.usecase";

const user = {
   name: 'John Doe',
   email: 'j.d@test.com',
   password: 'abc123',
   phone: '1234567890',
   document: '12345678901',
   address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345678',
      country: 'USA',
   },
};

describe('Integration test for Login', () => {
   it('should authenticate an user', async () => {
      const userRepository = new UserRepository();
      const createUserUsecase = new CreateUserUseCase(userRepository);
      const loginUsecase = new LoginUseCase(userRepository);

      const outputCreatedUser = await createUserUsecase.execute(user);

      const input = {
         email: user.email,
         password: user.password,
      };

      const spyJwtSign = jest.spyOn(Jwt, 'sign');

      const outputLogin = await loginUsecase.execute(input);

      expect(outputLogin).toHaveProperty('user');
      expect(outputLogin.user).toHaveProperty('id', outputCreatedUser.id);
      expect(outputLogin).toHaveProperty('accessToken');
      expect(spyJwtSign).toHaveBeenCalledTimes(1);
   });

   it('should throw an error when trying authenticate without user', async () => {
      const userRepository = new UserRepository();
      const createUserUsecase = new CreateUserUseCase(userRepository);
      const loginUsecase = new LoginUseCase(userRepository);

      await createUserUsecase.execute(user);

      const input = {
         email: 'any@email.com',
         password: user.password,
      };

      await expect(() => loginUsecase.execute(input)).rejects.toThrow('User not found');
   });

   it('should throw an error when trying authenticate with wrong password', async () => {
      const userRepository = new UserRepository();
      const createUserUsecase = new CreateUserUseCase(userRepository);
      const loginUsecase = new LoginUseCase(userRepository);

      await createUserUsecase.execute(user);

      const input = {
         email: user.email,
         password: 'wrong-password',
      };

      await expect(() => loginUsecase.execute(input)).rejects.toThrow('Invalid password');
   });
});
