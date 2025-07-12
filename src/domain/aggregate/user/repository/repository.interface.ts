import IRepository from "@domain/@shared/repository/repository.interface";
import { IAddressWithoutNotification } from "../interface/address.interface";
import { IUser, IUserDB } from "../interface/user.interface";

export default interface IUserRepository extends IRepository<IUserDB, IUser> {
   findByDocument(document: string): Promise<IUserDB | null>;
   saveAddress(address: IAddressWithoutNotification): Promise<void>;
}