export default interface IRepository<T> {
   create(entity: any): Promise<T>;
   update(entity: any): Promise<void>;
   find(id: string): Promise<T | null>;
}