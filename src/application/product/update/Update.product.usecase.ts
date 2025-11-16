import IProductRepository from "@domain/aggregate/product/repository/product.interface";
import { InputUpdateProductDTO } from "./update.product.dto";

export default class UpdateProductUseCase {
   constructor(private productRepository: IProductRepository<any, any, any>) {}

   async execute(input: InputUpdateProductDTO): Promise<void> {
      const product = await this.productRepository.find(input.id);

      if (!product) throw new Error("Product not found");

      if (input.price) product.changePrice(input.price, product.price);
      if (input.quantity) product.changeQuantity(input.quantity);

      await this.productRepository.update(product);
   }
}
