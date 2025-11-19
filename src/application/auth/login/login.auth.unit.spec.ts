import UserFactory from '@domain/aggregate/user/factory/user.factory';
import { BcryptHasher } from '@infra/@shared/helper/bcrypt-hasher';
import { Jwt } from '@infra/@shared/helper/jwt';
import LoginUseCase from './login.auth.usecase';

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

const id = crypto.randomUUID();

const MockRepository = () => ({
   create: jest.fn(),
   update: jest.fn(),
   find: jest.fn(),
   findByDocument: jest.fn(),
   findByEmail: jest.fn().mockResolvedValue(
      Promise.resolve(
         UserFactory.create({
            id,
            ...user,
         }),
      ),
   ),
   saveAddress: jest.fn(),
});

let userRepository: ReturnType<typeof MockRepository>;

describe('Unit test for Login', () => {

   beforeEach(async () => {
      const password = await BcryptHasher.hash(user.password);

      userRepository = MockRepository();

      userRepository.findByEmail.mockResolvedValueOnce(
         Promise.resolve(
            UserFactory.create({
               id,
               ...user,
               password,
            }),
         ),
      );
   });

   it('should authenticate an user', async () => {
      const loginUseCasse = new LoginUseCase(userRepository);

      const input = {
         email: 'j.d@test.com',
         password: 'abc123',
      };

      const spyJwtSign = jest.spyOn(Jwt, 'sign');

      const output = await loginUseCasse.execute(input);

      expect(output).toHaveProperty('user');
      expect(output.user).toHaveProperty('id');
      expect(output).toHaveProperty('accessToken');
      expect(spyJwtSign).toHaveBeenCalledTimes(1);
   });

   it('should throw an error when trying authenticate without user', async () => {
      const userRepository2 = MockRepository();
      userRepository2.findByEmail.mockResolvedValueOnce(Promise.resolve(null));
      const loginUseCasse = new LoginUseCase(userRepository2);

      const input = {
         email: 'j.d@test.com',
         password: 'abc123',
      };

      await expect(() => loginUseCasse.execute(input)).rejects.toThrow('User not found');
   });

   it('should throw an error when trying authenticate with wrong password', async () => {
      const loginUseCasse = new LoginUseCase(userRepository);

      const input = {
         email: 'j.d@test.com',
         password: 'invalid-password',
      };

      await expect(() => loginUseCasse.execute(input)).rejects.toThrow('Invalid password');
   });
});
