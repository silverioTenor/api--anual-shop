import Notification from "@domain/@shared/notification/notification";
import { Address } from "../value-object/address";

export interface IUser {
   id?: string;
   name: string;
   email: string;
   phone: string;
   password: string;
   document: string;
   notification: Notification;
   address: Address;

   changeEmail(email: string): void;
   changeAddress(addres: Address): void;
   changePassword(password: string): void;
}
