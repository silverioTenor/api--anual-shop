import { NotificationErrorPros } from "./notification";

export default class NotificationError extends Error {
   
   constructor(protected errors: NotificationErrorPros[]) {
      super(errors.map(error => `${error.context}: ${error.message.toLowerCase()}`).join(',\n'));
   }
}