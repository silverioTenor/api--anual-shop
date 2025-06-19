import Notification from "../../../@shared/notification/notification";

export interface IAddress {
   id?: string;
   userId: string;
   street: string;
   city: string;
   state: string;
   country: string;
   postalCode: string;
   notification: Notification;
}