import crypto from 'node:crypto';

import Entity from '@domain/@shared/entity/entity.abstract';
import { IProduct } from '../interface/product.interface';
import ProductValidatorFactory from '../factory/product.validator.factory';
import NotificationError from '../../../@shared/notification/notification.error';
import { boolean } from 'yup';

class Product extends Entity implements IProduct {
   private _id: string;
   private _name: string;
   private _description: string;
   private _oldPrice: number;
   private _price: number;
   private _quantity: number;
   private _active: boolean;
   private _userId?: string;
   private _categoryId?: string;

   constructor(
      name: string,
      description: string,
      oldPrice: number,
      price: number,
      quantity: number,
      active: boolean,
      userId: string,
      categoryId: string,
      id?: string,
   ) {
      super();
      this._id = !!id ? id : crypto.randomUUID();
      this._name = name;
      this._description = description;
      this._oldPrice = oldPrice;
      this._price = price;
      this._quantity = quantity;
      this._active = active;
      this._userId = userId;
      this._categoryId = categoryId;
      this.validate();

      if (this.notification?.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   get id(): string {
      return this._id;
   }

   get name(): string {
      return this._name;
   }

   get description(): string {
      return this._description;
   }

   get oldPrice(): number {
      return this._oldPrice;
   }

   get price(): number {
      return this._price;
   }

   get quantity(): number {
      return this._quantity;
   }

   get active() {
      return this._active;
   }

   get userId(): string {
      return this._userId || '';
   }

   get categoryId(): string {
      return this._categoryId || '';
   }

   private validate() {
      ProductValidatorFactory.create().validate(this);
   }

   changePrice(price: number) {
      if (price <= 0) {
         this.notification?.addError({
            context: 'Product',
            message: 'Price must be greater than zero',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._oldPrice = this._price;
      this._price = price;
   }

   changeQuantity(quantity: number): void {
      if (quantity < 0) {
         this.notification?.addError({
            context: 'Product',
            message: 'Quantity must be greater than or equal to zero',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._quantity = quantity;
   }

   activate() {
      if (this._price <= 0 || this._quantity <= 0) {
         this.notification?.addError({
            context: 'Product',
            message: 'Cannot activate product with price or quantity less than or equal to zero',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      if (this._active) {
         this.notification?.addError({
            context: 'Product',
            message: 'Product is already active',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._active = true;
   }

   deactivate() {
      if (!this._active) {
         this.notification?.addError({
            context: 'Product',
            message: 'Product is already inactive',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._active = false;
   }

   toString() {
      const product = {
         id: this._id,
         name: this._name,
         description: this._description,
         oldPrice: this._oldPrice,
         price: this._price,
         quantity: this._quantity,
         userId: this._userId,
         categoryId: this._categoryId,
      }
      
      return JSON.stringify(product, null, 3);
   }
}

export default class ProductBuilder {
   private _name: string;
   private _description: string;
   private _oldPrice: number;
   private _price: number;
   private _quantity: number;
   private _active: boolean;
   private _userId: string;
   private _categoryId: string;

   constructor() {
      this._name = '';
      this._description = '';
      this._oldPrice = 0;
      this._price = 0;
      this._quantity = 0;
      this._active = false;
      this._userId = '';
      this._categoryId = '';
   }

   withName(name: string): ProductBuilder {
      this._name = name;
      return this;
   }

   withDescription(description: string): ProductBuilder {
      this._description = description;
      return this;
   }

   withPrice(price: number): ProductBuilder {
      this._price = price;
      return this;
   }

   withQuantity(quantity: number): ProductBuilder {
      this._quantity = quantity;
      return this;
   }

   withUserId(userId: string): ProductBuilder {
      this._userId = userId;
      return this;
   }

   withCategoryId(categoryId: string): ProductBuilder {
      this._categoryId = categoryId;
      return this;
   }

   build(id?: string): IProduct {
      const product = new Product(
         this._name,
         this._description,
         this._oldPrice,
         this._price,
         this._quantity,
         this._active,
         this._userId,
         this._categoryId,
         id,
      );

      return product;
   }
}
