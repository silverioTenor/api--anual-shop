import IProductRepository from "@domain/aggregate/product/repository/product.interface";
import ProductBuilder from "@domain/aggregate/product/entity/product";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

export default class CreateProductUseCase {
   constructor(private productRepository: IProductRepository<any, any, any>) {}

   async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
      const productData = new ProductBuilder()
                              .withName(input.name)
                              .withDescription(input.description)
                              .withPrice(input.price)
                              .withQuantity(input.quantity)
                              .withUserId(input.userId)
                              .withCategoryId(input.categoryId)
                              .build();

      const product = await this.productRepository.create(productData);

      return { id: product.id };
   }
}
