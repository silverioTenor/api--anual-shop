import IRepository from "../../../@shared/repository/repository.interface";
import { IAddress } from "../interface/address.interface";
import { IUser, IUserDB } from "../interface/user.interface";

export default interface IUserRepository extends IRepository<IUserDB, IUser> {
   findByDocument(document: string): Promise<IUserDB | null>;
   saveAddress(address: IAddress): Promise<void>;
}