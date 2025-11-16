import IUserRepository from "@domain/aggregate/user/repository/repository.interface";
import { OutputUserDTO } from "../user.dto";
import { TsMapper } from "@infra/@shared/helper/ts.mapper";
import { mapper } from "@infra/@shared/config/mapper/mapper";
import { User } from "@domain/aggregate/user/entity/user";

export default class FindUserUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(id: string): Promise<OutputUserDTO> {
      const user = await this.userRepository.find(id);

      if (!user) {
         throw new Error('User not found!');
      }

      const tsMapper = new TsMapper(mapper, User, OutputUserDTO);
      const userDTO = tsMapper.convertEntityToDTO(user);

      return userDTO;
   }
}
