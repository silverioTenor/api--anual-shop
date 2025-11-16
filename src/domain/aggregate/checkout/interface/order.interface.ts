import Notification from "../../../@shared/notification/notification";
import { OrderItem } from "../entity/order-item";
import { OrderStatus } from "../enum/order.enum";
import { Payment } from "../value-object/payment";

export interface IOrder {
   id: string;
   userId: string;
   status: OrderStatus;
   payment: Payment;
   items: Array<OrderItem>;
   notification: Notification;

   addPayment(payment: Payment): void;
   addItems(items: OrderItem[]): void;
   total(): number;
}
