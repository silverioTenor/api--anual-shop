import AddressBuilder from "./address";

describe('Unit tests for Address', () => {
   it('should create an address', () => {
      const address = new AddressBuilder()
                           .withUserId(crypto.randomUUID())
                           .withStreet('street')
                           .withCity('city')
                           .withState('state')
                           .withCountry('country')
                           .withPostalCode('12345678')
                           .build();

      expect(address).toBeDefined();
      expect(address).toEqual({
         _id: expect.any(String),
         _userId: expect.any(String),
         _street: 'street',
         _city: 'city',
         _state: 'state',
         _country: 'country',
         _postalCode: '12345678',
         _notification: {
            errors: [],
         }
      });
   });

   it('should throw an error when creating without props', () => {
      expect(() => new AddressBuilder().build()).toThrow('Address: user id is required,\nAddress: street is required,\nAddress: city is required,\nAddress: state is required,\nAddress: country is required,\nAddress: postal code is required,\nAddress: postal code must be exactly 8 characters');
   });
});