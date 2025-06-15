import yup from 'yup';

import IValidator from '@domain/@shared/validator/validator.interface';
import { IProduct } from '../interface/product.interface';

export default class ProductYupValidator implements IValidator<IProduct> {
   validate(entity: IProduct): void {
      try {
         yup.object()
            .shape({
               id: yup.string().required('ID is required!').uuid('ID must be a valid UUID'),
               name: yup.string().required('Name is required!').min(3).max(255),
               description: yup.string().required().min(3).max(1000),
               oldPrice: yup.number().optional().min(0),
               price: yup
                  .number()
                  .positive('Price must be greater than zero!')
                  .required('Price is required!')
                  .min(0),
               quantity: yup
                  .number()
                  .positive('Price must be greater than zero!')
                  .required('Quantity is required!')
                  .min(0),
               userId: yup
                  .string()
                  .required('User ID is required!')
                  .uuid('User ID must be a valid UUID'),
               categoryId: yup
                  .string()
                  .required('Category ID is required!')
                  .uuid('Category ID must be a valid UUID'),
            })
            .validateSync(entity, { abortEarly: false });
      } catch (errors) {
         const e = errors as yup.ValidationError;

         e.errors.forEach(error => {
            throw new Error(error);
         });
      }
   }
}
