import IProductRepository from "@domain/aggregate/product/repository/product.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";
import ProductFactory from "../../../domain/aggregate/product/factory/product.factory";

export default class CreateProductUseCase {
   constructor(private productRepository: IProductRepository<any, any, any>) {}

   async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
      const productData = ProductFactory.create(input);

      const product = await this.productRepository.create(productData);

      return { id: product.id };
   }
}
