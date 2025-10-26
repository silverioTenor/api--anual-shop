import Notification from "@domain/@shared/notification/notification";

interface IProductProps {
   id: string;
   name: string;
   description: string;
   oldPrice: number;
   price: number;
   quantity: number;
   userId?: string;
   categoryId?: string;
   notification: Notification;
}
export interface IProduct extends IProductProps {

   changePrice(newPrice: number): void;
   changeQuantity(newQuantity: number): void;
   activate(): void;
   deactivate(): void;
   toString(): string;
}

export interface IProductDB extends Omit<IProductProps, 'notification'> {
   userId: string;
   categoryId: string;
   category: {
      id: string;
      name: string;
   } | undefined
}
