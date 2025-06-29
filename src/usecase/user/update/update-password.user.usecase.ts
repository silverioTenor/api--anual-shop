import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import UserFactory from '@domain/aggregate/user/factory/user.factory';
import { InputUpdateUserPasswordDTO } from './update.user.dto';

export default class UpdateUserPasswordUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(input: InputUpdateUserPasswordDTO) {
      const foundUser = await this.userRepository.find(input.id);

      if (!foundUser) throw new Error('User not found!');

      const user = UserFactory.create(foundUser);
      user.changePassword(input.password);

      await this.userRepository.update(user);
   }
}
