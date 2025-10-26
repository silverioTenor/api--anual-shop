import Notification from "../../../@shared/notification/notification";

export interface IAddress {
   userId: string;
   street: string;
   city: string;
   state: string;
   country: string;
   postalCode: string;
   notification: Notification;
}

export interface IAddressDB {
   userId: string;
   street: string;
   city: string;
   state: string;
   country: string;
   postalCode: string;
   createdAt: Date;
}