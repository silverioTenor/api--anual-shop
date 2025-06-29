import CreateUserUseCase from './Create.user.usecase';
import IUserRepository from '@domain/aggregate/user/repository/repository.interface';

const MockRepository = (): IUserRepository => ({
   create: jest.fn().mockResolvedValue(Promise.resolve({ id: crypto.randomUUID() })),
   update: jest.fn(),
   find: jest.fn(),
   findByDocument: jest.fn(),
   saveAddress: jest.fn(),
});

describe('Unit test for User', () => {
   it('should create a new user', async () => {
      const userMockRepository = MockRepository();
      const createUserUseCase = new CreateUserUseCase(userMockRepository);

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
