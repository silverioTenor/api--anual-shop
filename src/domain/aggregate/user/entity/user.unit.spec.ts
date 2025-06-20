import UserBuilder from './user';

describe('Unit tests for User entity', () => {
   it('should create an user', () => {
      const user = new UserBuilder()
                        .withName('Willy Wonka')
                        .withEmail('willy+test@wonka.com')
                        .withPhone('2199999999')
                        .withDocument('12345678910')
                        .withPassword('abc123')
                        .build();

      expect(user).toBeDefined();
      expect(user).toEqual({
         _id: expect.any(String),
         _name: 'Willy Wonka',
         _email: 'willy+test@wonka.com',
         _phone: '2199999999',
         _document: '12345678910',
         _password: 'abc123',
         _address: null,
         _notification: {
            errors: [],
         },
      });
   });

   it('should throw an error when changing address without props', () => {
      const user = new UserBuilder()
                        .withName('Willy Wonka')
                        .withEmail('willy+test@wonka.com')
                        .withPhone('2199999999')
                        .withDocument('12345678910')
                        .withPassword('abc123')
                        .build();

      expect(() => user.changeAddress({} as any)).toThrow('Address: user id is required,\nAddress: street is required,\nAddress: city is required,\nAddress: state is required,\nAddress: country is required,\nAddress: postal code is required');
   });

   it('should throw an error when creating user without props', () => {
      expect(() => new UserBuilder().build()).toThrow('User: name is required!,\nUser: name must be at least 3 characters,\nUser: email is required!,\nUser: email must be a valid email address!,\nUser: phone is required!,\nUser: phone must be at least 9 characters,\nUser: password is required!,\nUser: password must be at least 6 characters,\nUser: document is required!,\nUser: document must be at least 11 characters');
   });

   it('should throw an error when creating user with invalid email', () => {
      expect(() => {
         return new UserBuilder()
                     .withName('Willy Wonka')
                     .withEmail('willY+@test@wonka.com')
                     .withPhone('2199999999')
                     .withDocument('12345678910')
                     .withPassword('abc123')
                     .build();
      }).toThrow('email must be a valid email address!');
   });

   it('should throw an error when change email with invalid email', () => {
      expect(() => {
         const user = new UserBuilder()
                     .withName('Willy Wonka')
                     .withEmail('willy+test@wonka.com')
                     .withPhone('2199999999')
                     .withDocument('12345678910')
                     .withPassword('abc123')
                     .build();

         user.changeEmail('willY@+test@wonka.com');
      }).toThrow('email must be a valid email address!');
   });
});
