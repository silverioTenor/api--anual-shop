import { mockProduct, MockRepository } from "../product.seed";
import ListProductUseCase from "./List.product.usecase";

describe('Unit test for Product', () => {
   it('should list products with pagination', async () => {
      const productRepository = MockRepository();

      productRepository.all = jest.fn().mockReturnValue({
         data: [mockProduct, mockProduct],
         total: 2,
         page: 1,
         limit: 2,
         totalPages: 1
      });

      const productListUseCase = new ListProductUseCase(productRepository);

      const paginationParams = {
         page: 1,
         limit: 2
      }

      const filterParams = {
         userId: mockProduct.userId,
         categoryId: mockProduct.categoryId
      }

      const output = await productListUseCase.execute(filterParams, paginationParams);

      expect(output).toStrictEqual({
         data: [mockProduct, mockProduct],
         total: 2,
         page: 1,
         limit: 2,
         totalPages: 1
      });
   });
});
