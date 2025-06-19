import * as yup from 'yup';

import IValidator from '@domain/@shared/validator/validator.interface';
import { IOrder } from '../interface/order.interface';

export default class OrderYupValidator implements IValidator<IOrder> {
   validate(entity: IOrder) {
      try {
         yup.object()
            .shape({
               id: yup.string().optional(),
               userId: yup.string().required('User ID is required!').uuid('Field must be an UUID!'),
               status: yup.string().required('Status is required!'),
            })
            .validateSync(
               {
                  id: entity.id,
                  userId: entity.userId,
                  status: entity.status,
               },
               { abortEarly: false },
            );
      } catch (errors) {
         const e = errors as yup.ValidationError;

         e.errors.forEach(error => {
            entity.notification.addError({
               context: 'Order',
               message: error,
            });
         });
      }
   }
}
