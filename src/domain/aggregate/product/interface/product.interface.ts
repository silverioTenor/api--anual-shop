import Notification from "@domain/@shared/notification/notification";
import { Product } from "../entity/product";
import { Category } from "../entity/category";

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
   changeCategory(category: Category): void;
   activate(): void;
   deactivate(): void;
   toString(): string;
}

export interface IProductListPagination {
   data: Product[],
   total: number
}
