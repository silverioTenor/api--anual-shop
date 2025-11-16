import IRepository from "@domain/@shared/repository/repository.interface";
import { Category } from "../entity/category";

export default interface ICategoryRepository extends Partial<IRepository<Category>> {
   // create(entity: ICategory): Promise<Category>;
   // update(entity: ICategory): Promise<void>;
   // delete(id: string): Promise<void>;
   find(id: string): Promise<Category | null>;
   all(): Promise<Category[]>;
}
