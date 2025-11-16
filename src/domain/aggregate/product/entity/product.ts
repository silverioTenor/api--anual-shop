import Entity from '@domain/@shared/entity/entity.abstract';
import { IProduct } from '../interface/product.interface';
import ProductValidatorFactory from '../factory/product.validator.factory';
import NotificationError from '../../../@shared/notification/notification.error';
import { AutoMap } from '@automapper/classes';
import { Category } from './category';

export class Product extends Entity implements IProduct {
   private _name: string;
   private _description: string;
   private _oldPrice: number;
   private _price: number;
   private _quantity: number;
   private _active: boolean;
   private _userId?: string;
   private _categoryId?: string;
   private _category: Category;

   constructor(
      name: string,
      description: string,
      oldPrice: number,
      price: number,
      quantity: number,
      active: boolean,
      userId: string,
      categoryId: string,
      category: Category,
      id?: string,
   ) {
      super(id);
      this._name = name;
      this._description = description;
      this._oldPrice = oldPrice;
      this._price = price;
      this._quantity = quantity;
      this._active = active;
      this._userId = userId;
      this._categoryId = categoryId;
      this._category = category;
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
   get description(): string {
      return this._description;
   }

   @AutoMap()
   get oldPrice(): number {
      return this._oldPrice;
   }

   @AutoMap()
   get price(): number {
      return this._price;
   }

   @AutoMap()
   get quantity(): number {
      return this._quantity;
   }

   @AutoMap()
   get active() {
      return this._active;
   }

   @AutoMap()
   get userId(): string {
      return this._userId || '';
   }

   @AutoMap()
   get categoryId(): string {
      return this._categoryId || '';
   }

   get category(): Category {
      return this._category;
   }

   private validate() {
      ProductValidatorFactory.create().validate(this);
   }

   changePrice(price: number, oldPrice = 0): void {
      if (price <= 0) {
         this.notification?.addError({
            context: 'Product',
            message: 'Price must be greater than zero',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._oldPrice = oldPrice > 0 ? oldPrice : this._oldPrice;
      this._price = price;
   }

   changeQuantity(quantity: number): void {
      // if (quantity < 0) {
      //    this.notification?.addError({
      //       context: 'Product',
      //       message: 'Quantity must be greater than or equal to zero',
      //    });

      //    throw new NotificationError(this.notification.getErrors());
      // }

      this._quantity = quantity;
   }

   changeCategory(category: Category): void {
      if (!category) {
         this.notification?.addError({
            context: 'Product',
            message: 'Category must be provided',
         });

         throw new NotificationError(this.notification.getErrors());
      }

      this._category = category;
      this._categoryId = category.id;
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
         id: this.id,
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

export class ProductBuilder {
   private _name: string;
   private _description: string;
   private _oldPrice: number;
   private _price: number;
   private _quantity: number;
   private _active: boolean;
   private _userId: string;
   private _categoryId: string;
   private _category: Category;

   constructor() {
      this._name = '';
      this._description = '';
      this._oldPrice = 0;
      this._price = 1;
      this._quantity = 0;
      this._active = false;
      this._userId = '';
      this._categoryId = '';
      this._category = null as unknown as Category;
   }

   withName(name: string): ProductBuilder {
      this._name = name;
      return this;
   }

   withDescription(description: string): ProductBuilder {
      this._description = description;
      return this;
   }

   // withPrice(price: number): ProductBuilder {
   //    if (price) this._price = price;
   //    return this;
   // }

   // withQuantity(quantity: number): ProductBuilder {
   //    if (quantity) this._quantity = quantity;
   //    return this;
   // }

   withUserId(userId: string): ProductBuilder {
      this._userId = userId;
      return this;
   }

   withCategoryId(categoryId: string): ProductBuilder {
      this._categoryId = categoryId;
      return this;
   }

   withCategory(category: Category): ProductBuilder {
      this._category = category;
      return this;
   }

   build(id?: string): Product {
      const product = new Product(
         this._name,
         this._description,
         this._oldPrice,
         this._price,
         this._quantity,
         this._active,
         this._userId,
         this._categoryId,
         this._category,
         id,
      );

      return product;
   }
}
