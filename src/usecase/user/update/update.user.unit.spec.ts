import UpdateUserAddressUseCase from "./update-address.user.usecase";
import UpdateUserEmailUseCase from "./update-email.user.usecase";
import UpdateUserPasswordUseCase from "./update-password.user.usecase";

const userMock = {
   id: crypto.randomUUID(),
   name: 'William Silver',
   email: 'w.s@gmail.com',
   document: '12345678910',
   phone: '99999999999',
   password: 'abc123',
   address: undefined,
};

const MockRepository = () => ({
   create: jest.fn(),
   find: jest.fn().mockReturnValue(Promise.resolve(userMock)),
   update: jest.fn().mockReturnValue(Promise.resolve()),
   findByDocument: jest.fn(),
   saveAddress: jest.fn().mockReturnValue(Promise.resolve()),
});

describe('Unit test for User usecase', () => {
   it('should update email', async () => {
      const userMockRepository = MockRepository();

      const updateEmailUseCase = new UpdateUserEmailUseCase(userMockRepository);

      const input = {
         id: userMock.id,
         email: userMock.email,
      };

      await expect(updateEmailUseCase.execute(input)).resolves.not.toThrow();
   });

   it('should update address', async () => {
      const userMockRepository = MockRepository();

      const updateAddressUseCase = new UpdateUserAddressUseCase(userMockRepository);

      const input = {
         userId: userMock.id,
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
         id: userMock.id,
         password: userMock.password,
      };

      await expect(updatePasswordUseCase.execute(input)).resolves.not.toThrow();
   });
});
