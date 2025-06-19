import Notification from "../../../@shared/notification/notification";

export interface IOrderItem {
   productId: string;
   productName: string;
   price: number,
   quantity: number;
   notification: Notification;

   total(): number;
}