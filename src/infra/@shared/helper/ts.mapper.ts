import { Constructor, Mapper } from '@automapper/core';

export class TsMapper<T, K> {
  constructor(
    private readonly mapper: Mapper,
    private readonly entity: Constructor<T>,
    private readonly dto: Constructor<K>,
  ) {}

  convertEntityToDTO(entity: T): K {
    return this.mapper.map(entity, this.entity, this.dto);
  }

  convertDTOToEntity(dto: K): T {
    return this.mapper.map(dto, this.dto, this.entity);
  }
}
