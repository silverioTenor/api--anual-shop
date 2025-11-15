import Notification from "@domain/@shared/notification/notification";

export interface ICategory {
   id: string;
   name: string;
   notification: Notification;
}

export type ICategoryDB = Omit<ICategory, 'notification'>;
