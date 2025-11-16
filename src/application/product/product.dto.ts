import { AutoMap } from '@automapper/classes';
import { ICategory } from '@domain/aggregate/product/interface/category.interface';

export class OutputProductDTO {
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
   category!: ICategory;
}
