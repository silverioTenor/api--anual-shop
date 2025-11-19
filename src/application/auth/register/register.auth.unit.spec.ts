import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import UserFactory from '@domain/aggregate/user/factory/user.factory';
import { Jwt } from '@infra/@shared/helper/jwt';
import RegisterUseCase from './register.auth.usecase';

const input = {
   name: 'John Doe',
   email: 'j.d@test.com',
   password: 'abc123',
   phone: '1234567890',
   document: '12345678901',
   address: undefined,
};

const inputWithAddress = {
   ...input,
   address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345678',
      country: 'USA',
   },
};

const MockRepository = (): IUserRepository => ({
   create: jest.fn().mockResolvedValue(Promise.resolve(
      UserFactory.create({
         id: crypto.randomUUID(),
         ...input
      })
   )),
   update: jest.fn(),
   find: jest.fn(),
   findByDocument: jest.fn(),
   findByEmail: jest.fn(),
   saveAddress: jest.fn(),
});

describe('Unit test for Register', () => {
   it('should register an user', async () => {
      const userRepository = MockRepository();
      const registerUseCasse = new RegisterUseCase(userRepository);

      const spyJwtSign = jest.spyOn(Jwt, 'sign');

      const output = await registerUseCasse.execute(inputWithAddress);

      expect(output).toHaveProperty('user');
      expect(output.user).toHaveProperty('id');
      expect(output).toHaveProperty('accessToken');
      expect(userRepository.create).toHaveBeenCalled();
      expect(userRepository.saveAddress).toHaveBeenCalled();
      expect(spyJwtSign).toHaveBeenCalledTimes(1);
   });
});
