import IProductRepository from "@domain/aggregate/product/repository/product.interface";
import CreateProductUseCase from "./Create.product.usecase";

const mockProduct = {
   id: crypto.randomUUID(),
   name: "Product Test",
   description: "Description Test",
   oldPrice: 100,
   price: 80,
   quantity: 10,
   userId: crypto.randomUUID(),
   categoryId: crypto.randomUUID(),
   category: {
      id: crypto.randomUUID(),
      name: "Category Test",
   },
}

const MockRepository = (): IProductRepository => ({
   create: jest.fn().mockResolvedValue(Promise.resolve({ id: mockProduct.id })),
   update: jest.fn(),
   delete: jest.fn(),
   find: jest.fn(),
   all: jest.fn(),
});

describe('Unit test for Product', () => {
   it('should create a product', async () => {
      const productRepository = MockRepository();
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
      .rejects.toThrow('Product: price must be greater than or equal to 1');
   });
});
