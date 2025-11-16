import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import { InputUpdateUserAddressDTO } from './update.user.dto';

export default class UpdateUserAddressUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(input: InputUpdateUserAddressDTO) {
      const user = await this.userRepository.find(input.userId);

      if (!user) throw new Error('User not found!');

      user.changeAddress(input as any);

      await this.userRepository.saveAddress(user.address);
   }
}
