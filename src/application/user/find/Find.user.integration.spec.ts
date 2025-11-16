import UserRepository from '@infra/aggregate/user/db/prisma/repository/user.repository';
import FindUserUseCase from './Find.user.usecase';
import CreateUserUseCase from '../create/Create.user.usecase';

const input = {
   name: 'William Silver',
   email: 'w.s@gmali.com',
   document: '12345678910',
   phone: '21999999999',
   password: 'abc123',
   address: undefined,
};

describe('Integration test for User usecase', () => {
   it('should find a new user', async () => {
      const userRepository = new UserRepository();
      const createUserUseCase = new CreateUserUseCase(userRepository);
      const findUserUseCase = new FindUserUseCase(userRepository);

      const outputCreateUserDTO = await createUserUseCase.execute(input);
      const outputFindUserDTO = await findUserUseCase.execute(outputCreateUserDTO.id);

      expect(outputFindUserDTO).toBeDefined();
      expect(outputFindUserDTO).toEqual({
         id: outputCreateUserDTO.id,
         name: input.name,
         email: input.email,
         document: input.document,
         phone: input.phone,
         address: input.address,
      });
   });
});
