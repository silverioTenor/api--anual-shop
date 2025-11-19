import UserFactory from "@domain/aggregate/user/factory/user.factory";
import UpdateUserAddressUseCase from "./update-address.user.usecase";
import UpdateUserEmailUseCase from "./update-email.user.usecase";
import UpdateUserPasswordUseCase from "./update-password.user.usecase";

const user = UserFactory.create({
   id: crypto.randomUUID(),
   name: 'William Silver',
   email: 'w.s@gmail.com',
   document: '12345678910',
   phone: '99999999999',
   password: 'abc123',
   address: undefined,
});

const MockRepository = () => ({
   create: jest.fn(),
   find: jest.fn().mockReturnValue(Promise.resolve(user)),
   update: jest.fn().mockReturnValue(Promise.resolve()),
   findByDocument: jest.fn(),
   findByEmail: jest.fn(),
   saveAddress: jest.fn().mockReturnValue(Promise.resolve()),
});

describe('Unit test for User usecase', () => {
   it('should update email', async () => {
      const userMockRepository = MockRepository();

      const updateEmailUseCase = new UpdateUserEmailUseCase(userMockRepository);

      const input = {
         id: user.id,
         email: user.email,
      };

      await expect(updateEmailUseCase.execute(input)).resolves.not.toThrow();
   });

   it('should update address', async () => {
      const userMockRepository = MockRepository();

      const updateAddressUseCase = new UpdateUserAddressUseCase(userMockRepository);

      const input = {
         userId: user.id,
         street: 'street',
         city: 'city',
         state: 'state',
         country: 'country',
         postalCode: '12345678'
      };

      await expect(updateAddressUseCase.execute(input)).resolves.not.toThrow();
   });

   it('should update password', async () => {
      const userMockRepository = MockRepository();

      const updatePasswordUseCase = new UpdateUserPasswordUseCase(userMockRepository);

      const input = {
         id: user.id,
         password: user.password,
      };

      await expect(updatePasswordUseCase.execute(input)).resolves.not.toThrow();
   });
});
