import { AutoMap } from '@automapper/classes';
import { IProductDB } from '@domain/aggregate/product/interface/product.interface';
import { ICategoryDB } from '@domain/aggregate/product/interface/category.interface';

export class OutputProductDTO implements IProductDB {
   @AutoMap()
   id!: string;

   @AutoMap()
   name!: string;

   @AutoMap()
   description!: string;

   @AutoMap()
   price!: number;

   @AutoMap()
   oldPrice!: number;

   @AutoMap()
   quantity!: number;

   @AutoMap()
   active!: boolean;

   @AutoMap()
   userId!: string;

   @AutoMap()
   categoryId!: string;

   @AutoMap()
   category!: ICategoryDB;
}
