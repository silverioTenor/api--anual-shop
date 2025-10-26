import { mockProduct, MockRepository } from "../product.seed";
import FindProductUseCase from "./Find.product.usecase";

describe('Unit test for Product', () => {
   it('should find a product by id', async () => {
      const productRepository = MockRepository();
      productRepository.find = jest.fn().mockReturnValue(Promise.resolve(mockProduct));

      const findProductUseCase = new FindProductUseCase(productRepository);

      const input = { id: mockProduct.id };
      const result = await findProductUseCase.execute(input);

      expect(productRepository.find).toHaveBeenCalledWith(input.id);
      expect(result).toStrictEqual(mockProduct);
   });

   it('should throw an error when pass an invalid ID', async () => {
      const productRepository = MockRepository();

      const findProductUseCase = new FindProductUseCase(productRepository);

      const input = { id: 'invalid-id' };

      await expect(findProductUseCase.execute(input)).rejects.toThrow('Product not found');
   });
});
