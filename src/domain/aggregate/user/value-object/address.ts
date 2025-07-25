import { AutoMap } from '@automapper/classes';
import NotificationError from "../../../@shared/notification/notification.error";
import ValueObject from "../../../@shared/value-object/entity.abstract";
import AddressValidatorFactory from "../factory/address.validator.factory";
import { IAddress } from "../interface/address.interface";

class Address extends ValueObject implements IAddress {
   private _userId: string;
   private _street: string;
   private _city: string;
   private _state: string;
   private _country: string;
   private _postalCode: string;

   constructor(
      userId: string,
      street: string,
      city: string,
      state: string,
      country: string,
      postalCode: string,
   ) {
      super();
      this._userId = userId;
      this._street = street;
      this._city = city;
      this._state = state;
      this._country = country;
      this._postalCode = postalCode;
      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   @AutoMap()
   get userId() {
      return this._userId;
   }

   @AutoMap()
   get street() {
      return this._street;
   }

   @AutoMap()
   get city() {
      return this._city;
   }

   @AutoMap()
   get state() {
      return this._state;
   }

   @AutoMap()
   get country() {
      return this._country;
   }

   @AutoMap()
   get postalCode() {
      return this._postalCode;
   }

   private validate() {
      AddressValidatorFactory.create().validate(this);
   }
}

export default class AddressBuilder {
   private _userId: string;
   private _street: string;
   private _city: string;
   private _state: string;
   private _country: string;
   private _postalCode: string;

   constructor() {
      this._userId = "";
      this._street = "";
      this._city = "";
      this._state = "";
      this._country = "";
      this._postalCode = "";
   }

   withUserId(userId: string): AddressBuilder {
      this._userId = userId;
      return this;
   }

   withStreet(street: string): AddressBuilder {
      this._street = street;
      return this;
   }

   withCity(city: string): AddressBuilder {
      this._city = city;
      return this;
   }

   withState(state: string): AddressBuilder {
      this._state = state;
      return this;
   }

   withCountry(country: string): AddressBuilder {
      this._country = country;
      return this;
   }

   withPostalCode(postalCode: string): AddressBuilder {
      this._postalCode = postalCode;
      return this;
   }

   build(): Address {
      return new Address(
         this._userId,
         this._street,
         this._city,
         this._state,
         this._country,
         this._postalCode,
      );
   }
}