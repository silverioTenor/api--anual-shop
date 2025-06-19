import Entity from '../../../@shared/entity/entity.abstract';
import NotificationError from '../../../@shared/notification/notification.error';
import OrderItemValidatorFactory from '../factory/order-item.validator.factory';
import { IOrderItem } from '../interface/order-item.interface';

class OrderItem extends Entity implements IOrderItem {
   private _productId: string;
   private _productName: string;
   private _price: number;
   private _quantity: number;

   constructor(
      productId: string,
      productName: string,
      price: number,
      quantity: number,
      id?: string,
   ) {
      super(id);
      this._productId = productId;
      this._productName = productName;
      this._price = price;
      this._quantity = quantity;
      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
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

   total(): number {
      return this._price * this._quantity;
   }

   private validate() {
      OrderItemValidatorFactory.create().validate(this);
   }
}

export default class OrderItemBuilder {
   private _productId: string;
   private _productName: string;
   private _price: number;
   private _quantity: number;

   constructor() {
      this._productId = '';
      this._productName = '';
      this._price = 0;
      this._quantity = 0;
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

   build(id?: string) {
      return new OrderItem(
         this._productId,
         this._productName,
         this._price,
         this._quantity,
         id
      );
   }
}
