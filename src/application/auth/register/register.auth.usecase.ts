import UserFactory from "@domain/aggregate/user/factory/user.factory";
import IUserRepository from "@domain/aggregate/user/repository/repository.interface";
import { BcryptHasher } from "@infra/@shared/helper/bcrypt-hasher";
import { Jwt } from "@infra/@shared/helper/jwt";
import { InputRegisterDTO, OutputRegisterDTO } from "./register.auth.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export default class RegisterUseCase {

   constructor(
      @inject('UserRepository')
      private readonly userRepository: IUserRepository
   ) {}

   async execute(input: InputRegisterDTO): Promise<OutputRegisterDTO> {
      const { address, ...userProps } = input;

      const hasUser = await this.userRepository.findByDocument(userProps.document);

      if (hasUser) {
         throw new Error('User already registered!');
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

      const token = Jwt.sign({}, { subject: newUser.id });

      return {
         user: { id: newUser.id },
         accessToken: token,
      };
   }
}
