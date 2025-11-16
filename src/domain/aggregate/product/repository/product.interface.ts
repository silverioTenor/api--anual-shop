import IRepository from "@domain/@shared/repository/repository.interface";
import { Product } from "../entity/product";

export default interface IProductRepository<T, K, V> extends IRepository<Product> {
   create(entity: Product): Promise<Product>;
   update(entity: Product): Promise<void>;
   delete(id: string): Promise<void>;
   find(id: string): Promise<Product | null>;
   all(filters: T, paginationData: K): Promise<V>;
}
