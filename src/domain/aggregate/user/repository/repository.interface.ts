import IRepository from "../../../@shared/repository/repository.interface";
import { IAddress } from "../interface/address.interface";
import { IUserDB } from "../interface/user.interface";

export default interface IUserRepository extends IRepository<IUserDB> {
   saveAddress(address: IAddress): Promise<void>;
}