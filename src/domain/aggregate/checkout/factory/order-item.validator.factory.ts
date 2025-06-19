import IValidator from "../../../@shared/validator/validator.interface";
import { IOrderItem } from "../interface/order-item.interface";
import OrderItemYupValidator from "../validator/order-item.yup.validator";

export default class OrderItemValidatorFactory {
   static create(): IValidator<IOrderItem> {
      return new OrderItemYupValidator();
   }
}