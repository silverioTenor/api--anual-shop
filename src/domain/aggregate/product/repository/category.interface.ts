import IRepository from "@domain/@shared/repository/repository.interface";
import { ICategory, ICategoryDB } from "../interface/category.interface";

export default interface ICategoryRepository extends Partial<IRepository<ICategoryDB, ICategory>> {
   // create(entity: ICategory): Promise<ICategoryDB>;
   // update(entity: ICategory): Promise<void>;
   // delete(id: string): Promise<void>;
   find(id: string): Promise<ICategoryDB | null>;
   all(): Promise<ICategoryDB[]>;
}
