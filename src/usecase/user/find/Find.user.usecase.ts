import IUserRepository from "@domain/aggregate/user/repository/repository.interface";
import UserFactory from "@domain/aggregate/user/factory/user.factory";
import { OutputUserDTO } from "../user.dto";
import { TsMapper } from "@infra/@shared/helper/ts.mapper";
import { mapper } from "@infra/@shared/config/mapper/mapper";
import { User } from "@domain/aggregate/user/entity/user";

export default class FindUserUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(id: string): Promise<OutputUserDTO> {
      const foundUser = await this.userRepository.find(id);

      if (!foundUser) {
         throw new Error('User not found!');
      }

      const user = UserFactory.create(foundUser);

      const tsMapper = new TsMapper(mapper, User, OutputUserDTO);
      const userDTO = tsMapper.convertEntityToDTO(user as User);

      return userDTO;
   }
}
