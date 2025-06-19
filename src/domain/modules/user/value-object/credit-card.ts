import Entity from '../../../@shared/entity/entity.abstract';
import NotificationError from '../../../@shared/notification/notification.error';
import CreditCardValidatorFactory from '../factory/credit-card.validator.factory';
import { ICreditCard } from '../interface/credit-card.interface';

class CreditCard extends Entity implements ICreditCard {
   private _number: string;
   private _holder: string;
   private _expiryDate: string;
   private _cvv: string;
   private _active: boolean;
   private _userId: string;

   constructor(
      number: string,
      holder: string,
      expiryDate: string,
      cvv: string,
      active: boolean,
      userId: string,
      id?: string,
   ) {
      super(id);
      this._number = number;
      this._holder = holder;
      this._expiryDate = expiryDate;
      this._cvv = cvv;
      this._active = active;
      this._userId = userId;
      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   get number() {
      return this._number;
   }

   get holder() {
      return this._holder;
   }

   get expiryDate() {
      return this._expiryDate;
   }

   get cvv() {
      return this._cvv;
   }

   get active() {
      return this._active;
   }

   get userId() {
      return this._userId;
   }

   private validate() {
      CreditCardValidatorFactory.create().validate(this);
   }

   activate(): void {
      if (this._active) {
         this.notification.addError({
            context: 'CreditCard',
            message: 'Cannot activate an already active card!',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._active = true;
   }

   deactivate(): void {
      if (!this._active) {
         this.notification.addError({
            context: 'CreditCard',
            message: 'Cannot deactivate a card that has already been deactivated!',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._active = false;
   }
}

export default class CreditCardBuilder {
   private _number: string;
   private _holder: string;
   private _expiryDate: string;
   private _cvv: string;
   private _active: boolean;
   private _userId: string;

   constructor() {
      this._number = '';
      this._holder = '';
      this._expiryDate = '';
      this._cvv = '';
      this._active = false;
      this._userId = '';
   }

   withNumber(number: string): CreditCardBuilder {
      this._number = number;
      return this;
   }

   withHolder(holder: string): CreditCardBuilder {
      this._holder = holder;
      return this;
   }

   withExpiryDate(expiryDate: string): CreditCardBuilder {
      this._expiryDate = expiryDate;
      return this;
   }

   withCVV(cvv: string): CreditCardBuilder {
      this._cvv = cvv;
      return this;
   }

   withUserId(userId: string): CreditCardBuilder {
      this._userId = userId;
      return this;
   }

   build(id?: string): ICreditCard {
      return new CreditCard(
         this._number,
         this._holder,
         this._expiryDate,
         this._cvv,
         this._active,
         this._userId,
         id,
      );
   }
}
