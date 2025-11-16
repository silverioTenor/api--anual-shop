import ICategoryRepository from "@domain/aggregate/product/repository/category.interface";
import CategoryModel from "../model/category.model";
import { Category } from "@domain/aggregate/product/entity/category";
import CategoryFactory from "@domain/aggregate/product/factory/category.factory";

export default class CategoryRepository implements ICategoryRepository {
   async find(id: string): Promise<Category | null> {
      const result = await CategoryModel.db.findUnique({
         where: { id },
      });

      return result ? CategoryFactory.create(result) : null;
   }

   async all(): Promise<Category[]> {
      const result = await CategoryModel.db.findMany();

      return result
         ? result.map((item) => CategoryFactory.create(item))
         : [];
   }
}
