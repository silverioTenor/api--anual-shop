import crypto from 'node:crypto';

import Entity from '@domain/@shared/entity/entity.abstract';
import { IProduct } from '../interface/product.interface';
import ProductValidatorFactory from '../factory/product.validator.factory';

class Product extends Entity implements IProduct {
   private _id: string;
   private _name: string;
   private _description: string;
   private _oldPrice: number;
   private _price: number;
   private _quantity: number;
   private _userId: string;
   private _categoryId: string;

   constructor(
      name: string,
      description: string,
      oldPrice: number,
      price: number,
      quantity: number,
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
      this._userId = userId;
      this._categoryId = categoryId;
      this.validate();
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

   get userId(): string {
      return this._userId;
   }

   get categoryId(): string {
      return this._categoryId;
   }

   private validate() {
      ProductValidatorFactory.create().validate(this);
   }

   changePrice(price: number) {
      if (price <= 0) {
         throw new Error('Price must be greater than zero');
      }
   }
}

export default class ProductBuilder {
   private _name: string;
   private _description: string;
   private _oldPrice: number;
   private _price: number;
   private _quantity: number;
   private _userId: string;
   private _categoryId: string;

   constructor() {
      this._name = '';
      this._description = '';
      this._oldPrice = 0;
      this._price = 0;
      this._quantity = 0;
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

   withOldPrice(oldPrice: number): ProductBuilder {
      this._oldPrice = oldPrice;
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

   build(id?: string): Product {
      return new Product(
         this._name,
         this._description,
         this._oldPrice,
         this._price,
         this._quantity,
         this._userId,
         this._categoryId,
         id,
      );
   }
}
