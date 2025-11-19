import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import UserFactory from '@domain/aggregate/user/factory/user.factory';
import { BcryptHasher } from '@infra/@shared/helper/bcrypt-hasher';
import { InputCreateUserDTO, OutputCreateUserDTO } from './create.user.dto';

export default class CreateUserUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(input: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
      const { address, ...userProps } = input;

      const hasUser = await this.userRepository.findByDocument(userProps.document);

      if (hasUser) {
         throw new Error('User already exists!');
      }

      userProps.password = await BcryptHasher.hash(userProps.password);

      const user = UserFactory.create(userProps);
      const newUser = await this.userRepository.create(user);

      if (address) {

         newUser.changeAddress({
            ...address,
            userId: newUser.id
         } as any);

         await this.userRepository.saveAddress(newUser.address);

      }

      return { id: newUser.id };
   }
}
