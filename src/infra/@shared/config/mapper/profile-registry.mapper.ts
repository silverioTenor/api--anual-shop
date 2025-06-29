import { createMap, addProfile, MappingProfile } from '@automapper/core';
import { mapper } from './mapper';
import { User } from '@domain/aggregate/user/entity/user';
import { OutputUserDTO } from '@usecase/user/user.dto';

export default abstract class MapperRegistry {
   private static subscribe(): MappingProfile {
	  return (mapper) => {
		 createMap(mapper, User, OutputUserDTO);
		 createMap(mapper, OutputUserDTO, User);
	  };
   }

	static registerMapping() {
		addProfile(mapper, this.subscribe());
	}
}
