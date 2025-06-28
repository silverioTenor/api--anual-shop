export default interface IRepository<T, K> {
   create(entity: K): Promise<T>;
   update(entity: K): Promise<void>;
   find(id: string): Promise<T | null>;
}