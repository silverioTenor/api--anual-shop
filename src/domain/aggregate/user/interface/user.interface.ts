import Notification from "@domain/@shared/notification/notification";
import { IAddress, IAddressDB, IAddressWithoutNotification } from "./address.interface";

export interface IUser {
   id?: string;
   name: string;
   email: string;
   phone: string;
   password: string;
   document: string;
   notification: Notification;
   address: IAddress | null;

   changeEmail(email: string): void;
   changeAddress(addres: IAddressWithoutNotification): void;
   changePassword(password: string): void;
}

export interface IUserDB {
   id: string;
   name: string;
   email: string;
   phone: string;
   password: string;
   document: string;
   address: IAddressDB | undefined;
   createdAt: Date;
   updatedAt: Date;
}