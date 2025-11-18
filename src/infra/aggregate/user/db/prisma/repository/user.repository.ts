import IUserDBRepository from '@domain/aggregate/user/repository/repository.interface';
import { IUser } from '@domain/aggregate/user/interface/user.interface';
import { IAddress } from '@domain/aggregate/user/interface/address.interface';
import { User } from '@domain/aggregate/user/entity/user';
import UserFactory from '@domain/aggregate/user/factory/user.factory';
import UserModel from '../model/user.model';
import AddressModel from '../model/address.model';

export default class UserRepository implements IUserDBRepository {
   async create(entity: IUser): Promise<User> {
      const result = await UserModel.db.create({
         data: {
            name: entity.name,
            email: entity.email,
            phone: entity.phone,
            document: entity.document,
            password: entity.password,
         },
         include: { address: false },
      });

      return UserFactory.create(result);
   }

   async update(entity: IUser): Promise<void> {
      await UserModel.db.update({
         data: {
            email: entity.email,
            password: entity.password,
         },
         where: { id: entity.id },
         include: { address: true },
      });
   }

   async find(id: string): Promise<User | null> {
      const result = await UserModel.db.findUnique({
         where: { id },
         include: { address: true },
      });

      return result?.id
         ? UserFactory.create(result)
         : null;
   }

   async findByDocument(document: string): Promise<User | null> {
      const result = await UserModel.db.findUnique({
         where: { document },
         include: { address: true },
      });

      return result?.id
         ? UserFactory.create(result)
         : null;
   }

   async saveAddress(address: IAddress): Promise<void> {
      const addressPayload = {
         userId: address.userId,
         street: address.street,
         city: address.city,
         state: address.state,
         country: address.country,
         postalCode: address.postalCode,
      };

      await AddressModel.db.upsert({
         where: { userId: address.userId },
         update: addressPayload,
         create: addressPayload,
      });
   }
}
