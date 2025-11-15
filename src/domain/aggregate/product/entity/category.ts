import Entity from '@domain/@shared/entity/entity.abstract';
import { ICategory } from '../interface/category.interface';
import { AutoMap } from '@automapper/classes';

export class Category extends Entity implements ICategory {
   private _name: string;

   constructor(
      name: string,
      id?: string,
   ) {
      super(id);
      this._name = name;
   }

   @AutoMap()
   get name(): string {
      return this._name;
   }

   toString() {
      const Category = {
         id: this.id,
         name: this._name,
      }

      return JSON.stringify(Category, null, 3);
   }
}

export default class CategoryBuilder {
   private _name: string;

   constructor() {
      this._name = '';
   }

   withName(name: string): CategoryBuilder {
      this._name = name;
      return this;
   }

   build(id?: string): Category {
      return new Category(this._name, id);
   }
}
