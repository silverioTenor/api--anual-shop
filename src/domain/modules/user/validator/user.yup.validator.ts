import * as yup from 'yup';

import IValidator from '@domain/@shared/validator/validator.interface';
import { IUser } from '../interface/user.interface';

export default class UserYupValidator implements IValidator<IUser> {
   validate(entity: IUser) {
      try {
         yup.object()
            .shape({
               id: yup.string().optional(),
               name: yup.string().required('Name is required!').min(3).max(255),
               email: yup
                  .string()
                  .required('Email is required!')
                  .matches(/^[A-Za-z0-9]+([._+-]?[A-Za-z0-9]+)*@[a-z]+(\.[a-z]+)+$/, {
                     message: 'Email must be a valid email address!',
                  }),
               phone: yup.string().required('Phone is required!').min(9).max(11),
               password: yup.string().required('Password is required!').min(6).max(255),
               document: yup.string().required('Document is required!').min(11).max(14),
            })
            .validateSync(
               {
                  id: entity.id,
                  name: entity.name,
                  email: entity.email,
                  phone: entity.phone,
                  password: entity.password,
                  document: entity.document,
               },
               { abortEarly: false },
            );
      } catch (errors) {
         const e = errors as yup.ValidationError;

         e.errors.forEach(error => {
            entity.notification.addError({
               context: 'User',
               message: error,
            });
         });
      }
   }
}
