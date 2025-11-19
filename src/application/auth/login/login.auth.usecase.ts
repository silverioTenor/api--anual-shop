import { User } from "@domain/aggregate/user/entity/user";
import IUserRepository from "@domain/aggregate/user/repository/repository.interface";
import { TsMapper } from "@infra/@shared/helper/ts.mapper";
import { mapper } from "@infra/@shared/config/mapper/mapper";
import { BcryptHasher } from "@infra/@shared/helper/bcrypt-hasher";
import { Jwt } from "@infra/@shared/helper/jwt";
import { InputLoginDTO, OutputLoginDTO } from "./login.auth.dto";
import { OutputUserDTO } from "../../user/user.dto";

export default class LoginUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute({ email, password }: InputLoginDTO): Promise<OutputLoginDTO> {
      const foundUser = await this.userRepository.findByEmail(email);

      if (!foundUser) {
         throw new Error("User not found");
      }

      const isPasswordValid = await BcryptHasher.compare(password, foundUser.password);

      if (!isPasswordValid) {
         throw new Error("Invalid password");
      }

      const accessToken = Jwt.sign({}, { subject: foundUser.id });

      const tsMapper = new TsMapper(mapper, User, OutputUserDTO);
      const userDTO = tsMapper.convertEntityToDTO(foundUser);

      return {
         user: userDTO,
         accessToken,
      };
   }
}
