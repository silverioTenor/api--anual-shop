import IUserDBRepository from '@domain/aggregate/user/repository/repository.interface';
import { IUser, IUserDB } from '@domain/aggregate/user/interface/user.interface';
import { IAddress } from '@domain/aggregate/user/interface/address.interface';
import UserModel from '../model/user.model';
import AddressModel from '../model/address.model';

export default class UserRepository implements IUserDBRepository {
   async create(entity: IUser): Promise<IUserDB> {
      const data: any = { ...entity };

      if (data?.address) {
         data.address = { create: data.address };
      }

      const result = await UserModel.db.create({
         data,
         include: { address: true },
      });

      return {
         ...result,
         address: result?.address ?? undefined,
      };
   }

   async update(data: any): Promise<void> {
      await UserModel.db.update({
         data,
         where: { id: data.id },
         include: { address: true },
      });
   }

   async find(id: string): Promise<IUserDB | null> {
      const result = await UserModel.db.findUnique({
         where: { id },
         include: { address: true },
      });

      return result?.id
         ? {
              ...result,
              address: result?.address ?? undefined,
           }
         : null;
   }

   async findByDocument(document: string): Promise<IUserDB | null> {
      const result = await UserModel.db.findUnique({
         where: { document },
         include: { address: true },
      });

      return result?.id
         ? {
              ...result,
              address: result?.address ?? undefined,
           }
         : null;
   }

   async saveAddress(address: IAddress): Promise<void> {
      await AddressModel.db.upsert({
         where: { userId: address.userId },
         update: address,
         create: address,
      });
   }
}
