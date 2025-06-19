import IValidator from "../../../@shared/validator/validator.interface";
import { IPayment } from "../interface/payment.interface";
import PaymentYupValidator from "../validator/payment.yup.validator";

export default class PaymentValidatorFactory {
   static create(): IValidator<IPayment> {
      return new PaymentYupValidator();
   }
}