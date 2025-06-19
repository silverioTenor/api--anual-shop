import IValidator from "../../../@shared/validator/validator.interface";
import { IOrder } from "../interface/order.interface";
import OrderYupValidator from "../validator/order.yup.validator";

export default class OrderValidatorFactory {
   static create(): IValidator<IOrder> {
      return new OrderYupValidator();
   }
}