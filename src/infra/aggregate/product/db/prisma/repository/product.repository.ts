import IProductRepository from '@domain/aggregate/product/repository/product.interface';
import { IProduct, IProductDB, IProductListPagination } from '@domain/aggregate/product/interface/product.interface';
import ProductModel from '../model/product.model';
import { InputPaginationDTO, InputProductFiltersDTO } from '@usecase/product/list/list.product.dto';

export default class ProductRepository implements IProductRepository<InputProductFiltersDTO, InputPaginationDTO, IProductListPagination> {
   async create(entity: IProduct): Promise<IProductDB> {
      const result = await ProductModel.db.create({
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
            category: true,
         },
      });

      return result;
   }

   async update(entity: IProduct): Promise<void> {
      await ProductModel.db.update({
         data: {
            price: entity.price,
            oldPrice: entity.oldPrice,
            quantity: entity.quantity,
         },
         where: {
            id: entity.id,
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

   async all(
      filters: InputProductFiltersDTO,
      pagination: InputPaginationDTO,
   ): Promise<IProductListPagination> {
      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
         ProductModel.db.findMany({
            where: filters,
            skip,
            take: limit,
            include: {
               category: true,
            },
            orderBy: {
               createdAt: 'desc',
            }
         }),
         ProductModel.db.count({}),
      ]);

      return { data, total };
   }
}
