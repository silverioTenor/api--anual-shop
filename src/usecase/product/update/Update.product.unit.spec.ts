import ProductFactory from "@domain/aggregate/product/factory/product.factory";
import FindProductUseCase from "../find/Find.product.usecase";
import { mockProduct, MockRepository } from "../product.seed";
import UpdateProductUseCase from "./Update.product.usecase";

describe('Unit test for Product', () => {
   it('should update a product', async () => {
      const productRepository = MockRepository();
      productRepository.find = jest.fn().mockReturnValue(Promise.resolve(
         ProductFactory.create(mockProduct)
      ));

      productRepository.update = jest.fn().mockReturnValue(Promise.resolve(
         ProductFactory.create({
            ...mockProduct,
            oldPrice: mockProduct.price,
            price: 120,
            quantity: 9,
         })
      ));

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
