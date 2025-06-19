import Notification from "../../../@shared/notification/notification";
import { OrderStatus } from "../enum/order.enum";
import { IOrderItem } from "./order-item.interface";
import { IPayment } from "./payment.interface";

export interface IOrder {
   id: string;
   userId: string;
   status: OrderStatus;
   payment: IPayment;
   items: Array<IOrderItem>;
   notification: Notification;
   
   addPayment(payment: IPayment): void;
   addItems(items: IOrderItem[]): void;
   total(): number;
}