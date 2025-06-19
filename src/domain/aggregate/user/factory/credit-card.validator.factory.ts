import IValidator from "../../../@shared/validator/validator.interface";
import { ICreditCard } from "../interface/credit-card.interface";
import CreditCardYupValidator from "../validator/credit-card.yup.validator";

export default class CreditCardValidatorFactory {
   static create(): IValidator<ICreditCard> {
      return new CreditCardYupValidator();
   }
}