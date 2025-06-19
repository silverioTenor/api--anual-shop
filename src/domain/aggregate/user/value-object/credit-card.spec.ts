import CreditCardBuilder from './credit-card';

describe('Unit tests for CreditCard', () => {
   it('should add a new creditCard', () => {
      const creditCard = new CreditCardBuilder()
                              .withNumber('4000000000000010')
                              .withHolder('William J. K.')
                              .withExpiryDate('12/28')
                              .withCVV('123')
                              .withUserId(crypto.randomUUID())
                              .build();

      expect(creditCard).toBeDefined();
      expect(creditCard).toEqual({
         _id: expect.any(String),
         _number: '4000000000000010',
         _holder: 'William J. K.',
         _expiryDate: '12/28',
         _cvv: '123',
         _active: false,
         _userId: expect.any(String),
         _notification: {
            errors: [],
         },
      });
   });

   it('should throw an error when creating a creditCard without props', () => {
      expect(() => new CreditCardBuilder().build()).toThrow(
         'CreditCard: user id is required!,\nCreditCard: number is required!,\nCreditCard: number must be exactly 16 characters,\nCreditCard: holder is required!,\nCreditCard: expirydate is required,\nCreditCard: date invalid!,\nCreditCard: cvv is required,\nCreditCard: cvv must be exactly 3 characters',
      );
   });
});
