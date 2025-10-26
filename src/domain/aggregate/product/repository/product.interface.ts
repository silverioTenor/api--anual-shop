import IRepository from "@domain/@shared/repository/repository.interface";
import { IProduct, IProductDB } from "../interface/product.interface";

export default interface IProductRepository extends IRepository<IProductDB, IProduct> {
   create(entity: IProduct): Promise<IProductDB>;
   update(entity: IProduct): Promise<void>;
   delete(id: string): Promise<void>;
   find(id: string): Promise<IProductDB | null>;
   all(): Promise<IProductDB[]>;
}