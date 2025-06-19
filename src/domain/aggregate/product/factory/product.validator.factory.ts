import IValidator from "../../../@shared/validator/validator.interface";
import { IProduct } from "../interface/product.interface";
import ProductYupValidator from "../validator/product.yup.validator";

export default abstract class ProductValidatorFactory {
   static create(): IValidator<IProduct> {
      return new ProductYupValidator();
   }
}