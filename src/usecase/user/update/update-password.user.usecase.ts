import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import { InputUpdateUserPasswordDTO } from './update.user.dto';

export default class UpdateUserPasswordUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(input: InputUpdateUserPasswordDTO) {
      const user = await this.userRepository.find(input.id);

      if (!user) throw new Error('User not found!');

      user.changePassword(input.password);

      await this.userRepository.update(user);
   }
}
