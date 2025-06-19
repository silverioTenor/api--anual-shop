import Entity from '../../../@shared/entity/entity.abstract';
import NotificationError from '../../../@shared/notification/notification.error';
import { OrderStatus } from '../enum/order.enum';
import OrderValidatorFactory from '../factory/order-item.validator.factory copy';
import { IOrderItem } from '../interface/order-item.interface';
import { IOrder } from '../interface/order.interface';
import { IPayment } from '../interface/payment.interface';

class Order extends Entity implements IOrder {
   private _userId: string;
   private _status: OrderStatus;
   private _payment: IPayment;
   private _items: IOrderItem[];

   constructor(
      userId: string,
      status: OrderStatus,
      payment: IPayment,
      items: IOrderItem[],
      id?: string,
   ) {
      super(id);
      this._userId = userId;
      this._status = status;
      this._payment = payment;
      this._items = items;
      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   get userId() {
      return this._userId;
   }

   get status() {
      return this._status;
   }

   get payment() {
      return this._payment;
   }

   get items() {
      return this._items;
   }

   addPayment(payment: IPayment): void {
      if (!payment || Object.getOwnPropertyNames(payment).length <= 0) {
         this.notification.addError({
            context: 'Order',
            message: 'Payment cannot be void!',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      if (payment?.orderId !== this.id) {
         this.notification.addError({
            context: 'Order',
            message: 'Payment does not belong to the order!',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._payment = payment;
   }

   addItems(items: IOrderItem[]): void {
      if (items.length === 0) {
         this.notification.addError({
            context: 'Order',
            message: 'Items cannot be void!',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      for (let item of items) {
         if (item?.orderId !== this.id) {
            this.notification.addError({
               context: 'Order',
               message: 'Order ID does not belong to the order!',
            });
         }
      }

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }

      this._items = items;
   }

   total(): number {
      return this.items.reduce((acc, item) => acc + item.total(), 0);
   }

   private validate() {
      OrderValidatorFactory.create().validate(this);
   }
}

export default class OrderBuilder {
   private _userId: string;
   private _status: OrderStatus;
   private _payment: IPayment;
   private _items: IOrderItem[];

   constructor() {
      this._userId = '';
      this._status = '' as any;
      this._payment = null as any;
      this._items = [];
   }

   withUserId(userId: string): OrderBuilder {
      this._userId = userId;
      return this;
   }
   withStatus(status: OrderStatus): OrderBuilder {
      this._status = status;
      return this;
   }
   withPayment(payment: IPayment): OrderBuilder {
      this._payment = payment;
      return this;
   }
   withItems(items: IOrderItem[]): OrderBuilder {
      this._items = items;
      return this;
   }

   build(id?: string): IOrder {
      return new Order(this._userId, this._status, this._payment, this._items, id);
   }
}
