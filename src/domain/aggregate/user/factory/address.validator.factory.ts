import IValidator from "../../../@shared/validator/validator.interface";
import { IAddress } from "../interface/address.interface";
import AddressYupValidator from "../validator/address.yup.validator";

export default class AddressValidatorFactory {
   static create(): IValidator<IAddress> {
      return new AddressYupValidator();
   }
}