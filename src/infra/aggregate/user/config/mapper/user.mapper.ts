import { createMap, forMember, mapFrom, MappingProfile } from '@automapper/core';
import { User } from '@domain/aggregate/user/entity/user';
import { OutputUserDTO } from '@usecase/user/user.dto';

export const userMapper: MappingProfile = (mapper) => {
   createMap(mapper, User, OutputUserDTO,
      forMember(dest => dest.id, mapFrom(src => src.id)),
      forMember(dest => dest.name, mapFrom(src => src.name)),
      forMember(dest => dest.email, mapFrom(src => src.email)),
      forMember(dest => dest.phone, mapFrom(src => src.phone)),
      forMember(dest => dest.document, mapFrom(src => src.document)),
      forMember(dest => dest.address, mapFrom(src => src.address || undefined)),
   );

   createMap(mapper, OutputUserDTO, User);
};
