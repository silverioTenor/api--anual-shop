import ICategoryRepository from "@domain/aggregate/product/repository/category.interface";
import { ICategoryDB } from "@domain/aggregate/product/interface/category.interface";
import CategoryModel from "../model/category.model";

export default class CategoryRepository implements ICategoryRepository {
   async find(id: string): Promise<ICategoryDB | null> {
      const result = await CategoryModel.db.findUnique({
         where: { id },
      });

      return result;
   }

   async all(): Promise<ICategoryDB[]> {
      const result = await CategoryModel.db.findMany();
      return result;
   }
}
