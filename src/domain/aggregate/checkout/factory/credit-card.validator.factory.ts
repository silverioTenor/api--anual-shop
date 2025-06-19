import IValidator from "../../../@shared/validator/validator.interface";
import { ICreditCard } from "../../user/interface/credit-card.interface";
import CreditCardYupValidator from "../../user/validator/credit-card.yup.validator";

export default class CreditCardValidatorFactory {
   static create(): IValidator<ICreditCard> {
      return new CreditCardYupValidator();
   }
}