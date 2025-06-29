import { AutoMap } from '@automapper/classes';
import * as bcrypt from 'bcrypt';
import Entity from '../../../@shared/entity/entity.abstract';
import NotificationError from '../../../@shared/notification/notification.error';
import UserValidatorFactory from '../factory/user.validator.factory';
import { IAddress } from '../interface/address.interface';
import { IUser } from '../interface/user.interface';
import AddressBuilder from '../value-object/address';

export class User extends Entity implements IUser {
   private _name: string;
   private _email: string;
   private _phone: string;
   private _password: string;
   private _document: string;
   private _address!: IAddress | null;

   constructor(
      name: string,
      email: string,
      phone: string,
      password: string,
      document: string,
      id?: string,
   ) {
      super(id);
      this._name = name;
      this._email = email;
      this._phone = phone;
      this._password = password;
      this._document = document;
      this._address = null;

      this.validate();

      if (this.notification?.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   @AutoMap()
   get name(): string {
      return this._name;
   }

   @AutoMap()
   get email(): string {
      return this._email;
   }

   @AutoMap()
   get phone(): string {
      return this._phone;
   }

   get password(): string {
      return this._password;
   }

   @AutoMap()
   get document(): string {
      return this._document;
   }

   @AutoMap()
   get address(): IAddress | null {
      return this._address;
   }

   private validate() {
      UserValidatorFactory.create().validate(this);
   }

   changeEmail(email: string): void {
      const regex = new RegExp(/^[A-Za-z0-9]+([._+-]?[A-Za-z0-9]+)*@[a-z]+(\.[a-z]+)+$/);

      if (!regex.test(email)) {
         this.notification.addError({
            message: 'Email must be a valid email address!',
            context: 'user',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._email = email;
   }

   changeAddress(address: IAddress): void {
      const userId = address.userId || this.id;

      this._address = new AddressBuilder()
                           .withStreet(address.street)
                           .withCity(address.city)
                           .withState(address.state)
                           .withCountry(address.country)
                           .withPostalCode(address.postalCode)
                           .withUserId(userId)
                           .build();
   }

   changePassword(password: string): void {
      if (password.length < 5 || password.length > 20) {
         this.notification.addError({
            context: 'User',
            message: 'Invalid password length!',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      const passwordHashed = bcrypt.hashSync(password, 10);

      this._password = passwordHashed;
   }
}

export class UserBuilder {
   private _name: string;
   private _email: string;
   private _phone: string;
   private _password: string;
   private _document: string;

   constructor() {
      this._name = '';
      this._email = '';
      this._phone = '';
      this._password = '';
      this._document = '';
   }

   withName(name: string): UserBuilder {
      this._name = name;
      return this;
   }

   withEmail(email: string): UserBuilder {
      this._email = email;
      return this;
   }

   withPhone(phone: string): UserBuilder {
      this._phone = phone;
      return this;
   }

   withPassword(password: string): UserBuilder {
      this._password = password;
      return this;
   }

   withDocument(document: string): UserBuilder {
      this._document = document;
      return this;
   }

   build(id?: string): IUser {
      return new User(
         this._name,
         this._email,
         this._phone,
         this._password,
         this._document,
         id,
      );
   }
}
