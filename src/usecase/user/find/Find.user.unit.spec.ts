import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import FindUserUseCase from './Find.user.usecase';

const input = {
   id: crypto.randomUUID(),
   name: 'William Silver',
   email: 'w.s@gmali.com',
   document: '12345678910',
   phone: '21999999999',
   password: 'abc123',
   address: undefined,
};

const MockRepository = (): IUserRepository => ({
   create: jest.fn(),
   update: jest.fn(),
   find: jest.fn().mockResolvedValue(Promise.resolve(input)),
   findByDocument: jest.fn(),
   saveAddress: jest.fn(),
});

describe('Unit test for User usecase', () => {
   it('should find a new user', async () => {
      const userMockRepository = MockRepository();
      const findUserUseCase = new FindUserUseCase(userMockRepository);

      const outputFindUserDTO = await findUserUseCase.execute(input.id);

      expect(outputFindUserDTO).toBeDefined();
      expect(outputFindUserDTO).toEqual({
         id: input.id,
         name: 'William Silver',
         email: 'w.s@gmali.com',
         document: '12345678910',
         phone: '21999999999',
         address: undefined,
      });
   });
});
