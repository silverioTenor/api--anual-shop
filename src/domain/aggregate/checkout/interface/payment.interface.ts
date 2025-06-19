import Notification from "../../../@shared/notification/notification";
import { PaymentStatus } from "../enum/payment.enum";

export interface IPayment {
   orderId: string;
   method: IPaymentMethod;
   status: PaymentStatus;
   notification: Notification;

   changeStatus(status: string): void;
}

export interface IPaymentMethod {
   id: string;
   name: string;
   active: boolean;
}