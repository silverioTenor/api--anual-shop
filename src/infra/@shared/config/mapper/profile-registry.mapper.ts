import { addProfile } from '@automapper/core';
import { mapper } from './mapper';
import { userMapper } from '@infra/aggregate/user/config/mapper/user.mapper';

export default abstract class MapperRegistry {
   static regiterAll() {
      addProfile(mapper, userMapper);
   }
}
