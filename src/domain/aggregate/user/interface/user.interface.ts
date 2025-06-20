import Notification from "../../../@shared/notification/notification";
import { IAddress } from "./address.interface";

export interface IUser {
   id: string;
   name: string;
   email: string;
   phone: string;
   password: string;
   document: string;
   notification: Notification;
   address: IAddress | null;

   changeEmail(email: string): void;
   changeAddress(addres: IAddress): void;
}