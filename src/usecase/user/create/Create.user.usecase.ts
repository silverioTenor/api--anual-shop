import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import UserFactory from '@domain/aggregate/user/factory/user.factory';
import { InputCreateUserDTO, OutputCreateUserDTO } from './create.user.dto';

export default class CreateUserUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(input: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
      const hasUser = await this.userRepository.findByDocument(input.document);

      if (hasUser) {
         throw new Error('User already exists!');
      }

      const user = UserFactory.create(input);
      const userDB = await this.userRepository.create(user);

      if (user?.address) {
         await this.userRepository.saveAddress(user.address);
      }

      return { id: userDB.id };
   }
}
