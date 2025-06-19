import Notification from "../../../@shared/notification/notification";

export interface IOrderItem {
   id: string;
   orderId: string;
   productId: string;
   productName: string;
   price: number,
   quantity: number;
   notification: Notification;

   total(): number;
}