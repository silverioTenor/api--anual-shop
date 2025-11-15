import IProductRepository from "@domain/aggregate/product/repository/product.interface";
import { InputFindProductDTO } from "./find.product.dto";
import { OutputProductDTO } from "../product.dto";

export default class FindProductUseCase {
   constructor(private productRepository: IProductRepository<any, any, any>) {}

   async execute(input: InputFindProductDTO): Promise<OutputProductDTO> {
      const product = await this.productRepository.find(input.id);

      if (!product) throw new Error("Product not found");

      return product;
   }
}
