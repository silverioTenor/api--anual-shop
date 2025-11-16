import { Product, ProductBuilder } from "../entity/product";

export default class ProductFactory {
   static create(payload: any): Product {
      const product = new ProductBuilder()
                           .withName(payload.name)
                           .withDescription(payload.description)
                           .withUserId(payload.userId)
                           .withCategoryId(payload.categoryId)
                           .build(payload?.id);

      product.changePrice(payload.price, payload?.oldPrice);
      product.changeQuantity(payload.quantity);
      product.changeCategory(payload.category);

      return product;
   }
}
