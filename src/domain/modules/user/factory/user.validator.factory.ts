import IValidator from "../../../@shared/validator/validator.interface";
import { IUser } from "../interface/user.interface";
import UserYupValidator from "../validator/user.yup.validator";

export default class UserValidatorFactory {
   static create(): IValidator<IUser> {
      return new UserYupValidator();
   }
}