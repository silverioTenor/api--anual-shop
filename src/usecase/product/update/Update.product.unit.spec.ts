import FindProductUseCase from "../find/Find.product.usecase";
import { mockProduct, MockRepository } from "../product.seed";
import UpdateProductUseCase from "./Update.product.usecase";

describe('Unit test for Product', () => {
   it('should update a product', async () => {
      const productRepository = MockRepository();
      productRepository.find = jest.fn().mockReturnValue(Promise.resolve(mockProduct));

      const updateProductUseCase = new UpdateProductUseCase(productRepository);
      const findProductUseCase = new FindProductUseCase(productRepository);

      mockProduct.oldPrice = mockProduct.price;
      mockProduct.price = 120;
      mockProduct.quantity = 9;

      const spyUpdate = jest.spyOn(productRepository, 'update');

      await updateProductUseCase.execute(mockProduct);

      expect(spyUpdate).toHaveBeenCalled();

      const updatedProduct = await findProductUseCase.execute({ id: mockProduct.id });

      expect(updatedProduct.price).toBe(120);
      expect(updatedProduct.oldPrice).toBe(80);
      expect(updatedProduct.quantity).toBe(9);
   });
});
