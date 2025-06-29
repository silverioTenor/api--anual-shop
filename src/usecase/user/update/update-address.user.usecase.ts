import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import UserFactory from '@domain/aggregate/user/factory/user.factory';
import { InputUpdateUserAddressDTO } from './update.user.dto';

export default class UpdateUserAddressUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(input: InputUpdateUserAddressDTO) {
      const foundUser = await this.userRepository.find(input.address.userId);

      if (!foundUser) throw new Error('User not found!');

      const user = UserFactory.create(foundUser);
      user.changeAddress(input.address);

      await this.userRepository.saveAddress(input.address);
   }
}
