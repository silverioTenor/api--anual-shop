import Entity from '../../../@shared/entity/entity.abstract';
import NotificationError from '../../../@shared/notification/notification.error';
import OrderItemValidatorFactory from '../factory/order-item.validator.factory';
import { IOrderItem } from '../interface/order-item.interface';

class OrderItem extends Entity implements IOrderItem {
   private _orderId: string;
   private _productId: string;
   private _productName: string;
   private _price: number;
   private _quantity: number;

   constructor(
      orderId: string,
      productId: string,
      productName: string,
      price: number,
      quantity: number,
      id?: string,
   ) {
      super(id);
      this._orderId = orderId;
      this._productId = productId;
      this._productName = productName;
      this._price = price;
      this._quantity = quantity;
      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   get orderId() {
      return this._orderId;
   }

   get productId() {
      return this._productId;
   }

   get productName() {
      return this._productName;
   }

   get price() {
      return this._price;
   }

   get quantity() {
      return this._quantity;
   }

   changeQuantity(quantity: number): void {
      if (quantity <= 0) {
         this.notification.addError({
            context: 'OrderItem',
            message: 'Unable to reset item quantity!'
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._quantity = quantity;
   }

   total(): number {
      return this._price * this._quantity;
   }

   private validate() {
      OrderItemValidatorFactory.create().validate(this);
   }
}

export default class OrderItemBuilder {
   private _orderId: string;
   private _productId: string;
   private _productName: string;
   private _price: number;
   private _quantity: number;

   constructor() {
      this._orderId = '';
      this._productId = '';
      this._productName = '';
      this._price = 0;
      this._quantity = 0;
   }

   withOrderId(orderId: string) {
      this._orderId = orderId;
      return this;
   }

   withProductId(productId: string) {
      this._productId = productId;
      return this;
   }

   withProductName(productName: string) {
      this._productName = productName;
      return this;
   }

   withPrice(price: number) {
      this._price = price;
      return this;
   }

   withQuantity(quantity: number) {
      this._quantity = quantity;
      return this;
   }

   build(id?: string): IOrderItem {
      return new OrderItem(
         this._orderId,
         this._productId,
         this._productName,
         this._price,
         this._quantity,
         id
      );
   }
}
