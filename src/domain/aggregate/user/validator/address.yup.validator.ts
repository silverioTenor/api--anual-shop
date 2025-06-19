import * as yup from 'yup';

import IValidator from '@domain/@shared/validator/validator.interface';
import { IAddress } from '../interface/address.interface';

export default class AddressYupValidator implements IValidator<IAddress> {
   validate(entity: IAddress) {
      try {
         yup.object()
            .shape({
               id: yup.string().optional(),
               userId: yup.string().required('User ID is required'),
               street: yup.string().required('Street is required'),
               city: yup.string().required('City is required'),
               state: yup.string().required('State is required'),
               country: yup.string().required('Country is required'),
               postalCode: yup
                  .string()
                  .required('Postal code is required')
                  .length(8, 'Postal code must be exactly 8 characters'),
            })
            .validateSync(
               {
                  id: entity.id,
                  userId: entity.userId,
                  street: entity.street,
                  city: entity.city,
                  state: entity.state,
                  country: entity.country,
                  postalCode: entity.postalCode,
               },
               { abortEarly: false },
            );
      } catch (errors) {
         const e = errors as yup.ValidationError;

         e.errors.forEach(error => {
            entity.notification.addError({
               context: 'Address',
               message: error,
            });
         });
      }
   }
}
