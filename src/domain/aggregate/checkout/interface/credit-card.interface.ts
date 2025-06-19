import Notification from "../../../@shared/notification/notification";

export interface ICreditCard {
   number: string;
   holder: string;
   expiryDate: string;
   cvv: string;
   active: boolean;
   userId: string;
   notification: Notification;

   activate(): void;
   deactivate(): void;
}