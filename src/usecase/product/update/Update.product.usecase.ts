import IProductRepository from "@domain/aggregate/product/repository/product.interface";
import { InputUpdateProductDTO } from "./update.product.dto";

export default class UpdateProductUseCase {
   constructor(private productRepository: IProductRepository<any, any, any>) {}

   async execute(input: InputUpdateProductDTO): Promise<void> {
      const foundProduct = await this.productRepository.find(input.id);

      if (!foundProduct) {
         throw new Error("Product not found");
      }

      const productToUpdate = {
         ...foundProduct,
         price: input.price,
         oldPrice: input.oldPrice,
         quantity: input.quantity,
      };

      await this.productRepository.update(productToUpdate as any);
   }
}
