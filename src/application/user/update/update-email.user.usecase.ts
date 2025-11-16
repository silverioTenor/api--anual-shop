import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import { InputUpdateUserEmailDTO } from './update.user.dto';

export default class UpdateUserEmailUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(input: InputUpdateUserEmailDTO) {
      const user = await this.userRepository.find(input.id);

      if (!user) throw new Error('User not found!');

      user.changeEmail(input.email);

      await this.userRepository.update(user);
   }
}
