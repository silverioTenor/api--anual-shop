import * as yup from 'yup';

import IValidator from '@domain/@shared/validator/validator.interface';
import { IOrderItem } from '../interface/order-item.interface';

export default class OrderItemYupValidator implements IValidator<IOrderItem> {
   validate(entity: IOrderItem) {
      try {
         yup.object()
            .shape({
               id: yup.string().optional(),
               orderId: yup
                  .string()
                  .required('Order ID is required!')
                  .uuid('Order ID must be an UUID'),
               productId: yup.string().required('Product ID is required!'),
               productName: yup.string().required('Product name is required!'),
               price: yup
                  .number()
                  .required('price is required')
                  .min(1, 'Price must be greater than 0!'),
               quantity: yup.number().required('Quantity is required!'),
            })
            .validateSync(
               {
                  id: entity.id,
                  orderId: entity.orderId,
                  productId: entity.productId,
                  productName: entity.productName,
                  price: entity.price,
                  quantity: entity.quantity,
               },
               { abortEarly: false },
            );
      } catch (errors) {
         const e = errors as yup.ValidationError;

         e.errors.forEach(error => {
            entity.notification.addError({
               context: 'OrderItem',
               message: error,
            });
         });
      }
   }
}
