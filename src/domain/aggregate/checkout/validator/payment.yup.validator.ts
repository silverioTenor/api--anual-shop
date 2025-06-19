import * as yup from 'yup';
import IValidator from '../../../@shared/validator/validator.interface';
import { IPayment } from '../interface/payment.interface';

export default class PaymentYupValidator implements IValidator<IPayment> {
   validate(entity: IPayment) {
      try {
         yup.object()
            .shape({
               orderId: yup.string().required('User ID is required!'),
               status: yup.string().required('Status is required!'),
            })
            .validateSync(
               {
                  orderId: entity.orderId,
                  status: entity.status,
               },
               { abortEarly: false },
            );
      } catch (errors) {
         const e = errors as yup.ValidationError;

         e.errors.forEach(error => {
            entity.notification.addError({
               context: 'Payment',
               message: error,
            });
         });
      }
   }
}
