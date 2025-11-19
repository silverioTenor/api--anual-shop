import UserRepository from '@infra/aggregate/user/db/prisma/repository/user.repository';
import { Jwt } from '@infra/@shared/helper/jwt';
import RegisterUseCase from './register.auth.usecase';

describe('Integration test for Register', () => {
   it('should register an user', async () => {
      const userRepository = new UserRepository();
      const registerUserUseCase = new RegisterUseCase(userRepository);

      const input = {
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

      const spyJwtSign = jest.spyOn(Jwt, 'sign');
      const spySaveAddress = jest.spyOn(userRepository, 'saveAddress');

      const output = await registerUserUseCase.execute(input);

      expect(output).toHaveProperty('user');
      expect(output.user).toHaveProperty('id');
      expect(output).toHaveProperty('accessToken');
      expect(spyJwtSign).toHaveBeenCalledTimes(1);
      expect(spySaveAddress).toHaveBeenCalledTimes(1);
   });

   it('should register an user without address', async () => {
      const userRepository = new UserRepository();
      const registerUserUseCase = new RegisterUseCase(userRepository);

      const input = {
         name: 'John Doe',
         email: 'j.d@test.com',
         password: 'abc123',
         phone: '1234567890',
         document: '12345678901',
         address: undefined,
      };

      const spyJwtSign = jest.spyOn(Jwt, 'sign');

      const output = await registerUserUseCase.execute(input);

      expect(output).toHaveProperty('user');
      expect(output.user).toHaveProperty('id');
      expect(output).toHaveProperty('accessToken');
      expect(spyJwtSign).toHaveBeenCalledTimes(1);
   });

   it('should not register an user that already exists', async () => {
      const userRepository = new UserRepository();
      const registerUserUseCase = new RegisterUseCase(userRepository);

      const input = {
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

      await registerUserUseCase.execute(input);

      await expect(() => registerUserUseCase.execute(input)).rejects.toThrow(
         'User already registered!',
      );
   });
});
