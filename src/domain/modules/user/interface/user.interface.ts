import Notification from "../../../@shared/notification/notification";

export interface IUser {
   id: string;
   name: string;
   email: string;
   phone: string;
   password: string;
   document: string;
   notification: Notification;
}