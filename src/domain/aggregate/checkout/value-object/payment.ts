import NotificationError from '../../../@shared/notification/notification.error';
import ObjectValue from '../../../@shared/object-value/entity.abstract';
import { PaymentStatus } from '../enum/payment.enum';
import PaymentValidatorFactory from '../factory/payment.validator.factory';
import { IPayment, IPaymentMethod } from '../interface/payment.interface';

class Payment extends ObjectValue implements IPayment {
   private _orderId: string;
   private _method: IPaymentMethod;
   private _status: PaymentStatus;

   constructor(orderId: string, method: IPaymentMethod, status: PaymentStatus) {
      super();
      this._orderId = orderId;
      this._method = method;
      this._status = status;
      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   get orderId() {
      return this._orderId;
   }

   get method() {
      return this._method;
   }

   get status() {
      return this._status;
   }

   changeStatus(status: string) {
      if (status.length <= 0) {
         this.notification.addError({
            context: 'Payment',
            message: 'Invalid status!',
         });

         throw new NotificationError(this.notification.getErrors());
      }
   }

   private validate() {
      PaymentValidatorFactory.create().validate(this);
   }
}

export default class PaymentBuilder {
   private _orderId: string;
   private _method: IPaymentMethod;
   private _status!: PaymentStatus;

   constructor() {
      this._orderId = '';
      this._method = {} as IPaymentMethod;
   }

   withOrderId(orderId: string): PaymentBuilder {
      this._orderId = orderId;
      return this;
   }

   withMethod(method: IPaymentMethod): PaymentBuilder {
      this._method = method;
      return this;
   }

   withStatus(status: PaymentStatus): PaymentBuilder {
      this._status = status;
      return this;
   }

   build(): IPayment {
      return new Payment(this._orderId, this._method, this._status);
   }
}
