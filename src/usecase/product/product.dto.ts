import { AutoMap } from '@automapper/classes';

export class ProductDTO {
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
   quantity!: string;

   @AutoMap()
   active!: string;

   @AutoMap()
   userId!: string;
   
   @AutoMap()
   categoryId!: string;

   @AutoMap()
   category!: {
      id: string;
      name: string;
   };
}