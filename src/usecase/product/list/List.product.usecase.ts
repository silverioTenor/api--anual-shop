import IProductRepository from '@domain/aggregate/product/repository/product.interface';
import { IProductListPagination } from '@domain/aggregate/product/interface/product.interface';
import {
   InputPaginationDTO,
   InputProductFiltersDTO,
   OutputProductPaginationDTO,
} from './list.product.dto';

export default class ListProductUseCase {
   constructor(
      private productRepository: IProductRepository<InputProductFiltersDTO, InputPaginationDTO, IProductListPagination>
   ) {}

   async execute(
      filters: InputProductFiltersDTO,
      paginationData: InputPaginationDTO,
   ): Promise<OutputProductPaginationDTO> {

      const { userId, categoryId } = filters;
      const { page, limit } = paginationData;

      if (page <= 0 || limit <= 0) {
         throw new Error('Page and limit must be greater than zero.');
      }

      const conditions: InputProductFiltersDTO = {};

      if (!!userId) conditions['userId'] = userId;
      if (!!categoryId) conditions['categoryId'] = categoryId;

      const result = await this.productRepository.all(conditions, paginationData);

      if (!result) {
         throw new Error('No registered products were found.');
      }

      const { data, total } = result;

      return {
         data,
         total,
         page,
         limit,
         totalPages: Math.ceil(total / limit),
      }
   }
}
