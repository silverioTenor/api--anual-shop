import Notification from "../../../@shared/notification/notification";

export interface IProduct {
   id: string;
   name: string;
   description: string;
   oldPrice: number;
   price: number;
   quantity: number;
   userId?: string;
   categoryId?: string;
   notification: Notification;

   changePrice(newPrice: number): void;
   changeQuantity(newQuantity: number): void;
   activate(): void;
   deactivate(): void;
   toString(): string;
}