import * as yup from 'yup';

import IValidator from '@domain/@shared/validator/validator.interface';
import { IProduct } from '../interface/product.interface';

export default class ProductYupValidator implements IValidator<IProduct> {
   validate(entity: IProduct): void {
      try {
         yup.object()
            .shape({
               id: yup.string().optional(),
               name: yup.string().required('Name is required!').min(3).max(255),
               description: yup.string().required('Description is required!').min(3).max(1000),
               price: yup.number().required('Price is required!').positive().min(1),
               quantity: yup.number().required('Quantity is required!').positive().min(1),
            })
            .validateSync(
               {
                  id: entity.id,
                  name: entity.name,
                  description: entity.description,
                  price: entity.price,
                  quantity: entity.quantity,
               },
               { abortEarly: false },
            );
      } catch (errors) {
         const e = errors as yup.ValidationError;

         e.errors.forEach(error => {
            entity.notification.addError({
               context: 'Product',
               message: error.toLowerCase(),
            });
         });
      }
   }
}
