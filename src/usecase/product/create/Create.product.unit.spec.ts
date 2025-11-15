import IProductRepository from "@domain/aggregate/product/repository/product.interface";
import CreateProductUseCase from "./Create.product.usecase";
import { mockProduct, MockRepository } from "../product.seed";

describe('Unit test for Product', () => {
   it('should create a product', async () => {
      const productRepository = MockRepository();
      productRepository.create = jest.fn().mockReturnValue(Promise.resolve({ id: mockProduct.id }));

      const createProductUseCase = new CreateProductUseCase(productRepository);

      const output = await createProductUseCase.execute(mockProduct);

      expect(output).toBeDefined();
      expect(output).toStrictEqual({ id: mockProduct.id });
   });

   it('should not create a product with price equal to zero', async () => {
      const productRepository = MockRepository();
      const createProductUseCase = new CreateProductUseCase(productRepository);

      mockProduct.price = 0;

      await expect(async () => await createProductUseCase.execute(mockProduct))
      .rejects.toThrow('Product: price must be greater than zero');
   });
});
