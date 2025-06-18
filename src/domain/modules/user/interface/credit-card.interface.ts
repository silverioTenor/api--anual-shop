import Notification from "../../../@shared/notification/notification";

export interface ICreditCard {
   id?: string;
   number: string;
   holder: string;
   expiryDate: string;
   cvv: number;
   active: boolean;
   userId: string;
   notification: Notification;

   activate(): void;
   deactivate(): void;
}