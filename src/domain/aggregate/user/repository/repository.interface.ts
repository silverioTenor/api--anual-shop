import IRepository from "@domain/@shared/repository/repository.interface";
import { User } from "../entity/user";
import { Address } from "../value-object/address";

export default interface IUserRepository extends IRepository<User> {
   findByDocument(document: string): Promise<User | null>;
   findByEmail(email: string): Promise<User | null>;
   saveAddress(address: Address): Promise<void>;
}
