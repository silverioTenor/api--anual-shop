import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import UserFactory from '@domain/aggregate/user/factory/user.factory';
import { IAddress } from '@domain/aggregate/user/interface/address.interface';
import { InputUpdateUserAddressDTO } from './update.user.dto';

export default class UpdateUserAddressUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(input: InputUpdateUserAddressDTO) {
      const foundUser = await this.userRepository.find(input.userId);

      if (!foundUser) throw new Error('User not found!');

      const user = UserFactory.create(foundUser);

      const inputAddress: IAddress = {
         userId: input.userId,
         street: input.street,
         city: input.city,
         state: input.state,
         country: input.country,
         postalCode: input.postalCode,
      };

      user.changeAddress(inputAddress);

      await this.userRepository.saveAddress(inputAddress);
   }
}
