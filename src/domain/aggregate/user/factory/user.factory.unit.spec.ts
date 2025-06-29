import UserFactory from './user.factory';

describe('Unit tests for user factory', () => {
   it('should create an user with null address', () => {
      const userRequest = {
         name: 'William Joker',
         email: 'will.j@gmail.com',
         phone: '21999999999',
         password: 'abc123',
         document: '12345678910',
      };

      const user = UserFactory.create(userRequest);

      expect(user).toBeDefined();
      expect(user).toEqual({
         _id: expect.any(String),
         _name: 'William Joker',
         _email: 'will.j@gmail.com',
         _phone: '21999999999',
         _password: expect.any(String),
         _document: '12345678910',
         _address: null,
         _notification: {
            errors: [],
         },
      });
   });

   it('should create an user with address', () => {
      const userRequest = {
         name: 'William Joker',
         email: 'will.j@gmail.com',
         phone: '21999999999',
         password: 'abc123',
         document: '12345678910',
         address: {
            userId: crypto.randomUUID(),
            street: 'street',
            city: 'city',
            state: 'state',
            country: 'country',
            postalCode: '12345600',
         }
      }

      const user = UserFactory.create(userRequest);

      expect(user).toBeDefined();
      expect(user).toEqual({
         _id: expect.any(String),
         _name: 'William Joker',
         _email: 'will.j@gmail.com',
         _phone: '21999999999',
         _password: expect.any(String),
         _document: '12345678910',
         _address: {
            _userId: expect.any(String),
            _street: 'street',
            _city: 'city',
            _state: 'state',
            _country: 'country',
            _postalCode: '12345600',
            _notification: {
               errors: [],
            },
         },
         _notification: {
            errors: [],
         },
      });
   });
});
