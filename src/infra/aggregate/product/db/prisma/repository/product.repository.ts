import IProductRepository from "@domain/aggregate/product/repository/product.interface";
import { IProduct, IProductDB } from "@domain/aggregate/product/interface/product.interface";
import ProductModel from "../model/product.model";

export default class ProductRepository implements IProductRepository {
   async create(entity: IProduct): Promise<IProductDB> {
      const result =  await ProductModel.db.create({
         data: {
            name: entity.name,
            description: entity.description,
            oldPrice: entity.oldPrice,
            price: entity.price,
            quantity: entity.quantity,
            userId: entity!.userId as string,
            categoryId: entity!.categoryId as string,
         },
         include: {
            category: false,
         },
      });

      return {
         ...result,
         category: undefined,
      };
   }

   async update(entity: IProduct): Promise<void> {
      await ProductModel.db.update({
         data: {
            price: entity.price,
            oldPrice: entity.oldPrice,
            quantity: entity.quantity,
         },
         where: {
            id: entity.id
         },
      });
   }

   async delete(id: string): Promise<void> {
      await ProductModel.db.delete({
         where: { id },
      });
   }

   async find(id: string): Promise<IProductDB | null> {
      const result = await ProductModel.db.findUnique({
         where: { id },
         include: {
            category: true,
         },
      });

      return result;
   }

   async all(): Promise<IProductDB[]> {
      const results = await ProductModel.db.findMany({
         include: {
            category: true,
         },
      });

      return results;
   }
}
