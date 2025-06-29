import { AutoMap } from '@automapper/classes';

export class OutputUserDTO {
  constructor() {}

  @AutoMap()
  public id!: string;

  @AutoMap()
  public name!: string;

  @AutoMap()
  public email!: string;

  @AutoMap()
  public document!: string;

  @AutoMap()
  public phone!: string;

  @AutoMap()
  public address!: {
    userId: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  } | null;
}
