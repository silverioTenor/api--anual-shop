import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import { InputUpdateUserEmailDTO } from './update.user.dto';
import UserFactory from '../../../domain/aggregate/user/factory/user.factory';

export default class UpdateUserEmailUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(input: InputUpdateUserEmailDTO) {
      const foundUser = await this.userRepository.find(input.id);

      if (!foundUser) throw new Error('User not found!');

      const user = UserFactory.create(foundUser);
      user.changeEmail(input.email);

      await this.userRepository.update(user);
   }
}
