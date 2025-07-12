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

      user.changeAddress(input);

      await this.userRepository.saveAddress(input);
   }
}
