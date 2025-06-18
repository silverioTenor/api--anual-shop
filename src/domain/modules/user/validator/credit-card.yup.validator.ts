import * as yup from 'yup';

import IValidator from '@domain/@shared/validator/validator.interface';
import { ICreditCard } from '../interface/credit-card.interface';

export default class CreditCardYupValidator implements IValidator<ICreditCard> {
   validate(entity: ICreditCard) {
      try {
         yup.object()
            .shape({
               id: yup.string().optional(),
               userId: yup.string().required('User ID is required!'),
               number: yup.string().required('Number is required!').length(16),
               holder: yup.string().required('Holder is required!'),
               expiryDate: yup
                  .string()
                  .required('expiryDate is required')
                  .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Date invalid!' }),
               cvv: yup.string().required('CVV is required'),
            })
            .validateSync(
               {
                  id: entity.id,
                  userId: entity.userId,
                  number: entity.number,
                  holder: entity.holder,
                  expiryDate: entity.expiryDate,
                  cvv: entity.cvv,
               },
               { abortEarly: false },
            );
      } catch (errors) {
         const e = errors as yup.ValidationError;

         e.errors.forEach(error => {
            entity.notification.addError({
               context: 'CreditCard',
               message: error,
            });
         });
      }
   }
}
