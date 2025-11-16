import CategoryBuilder, { Category } from "../entity/category";

export default class CategoryFactory {
   static create(payload: any): Category {
      return new CategoryBuilder()
                  .withName(payload.name)
                  .build(payload?.id);
   }
}
