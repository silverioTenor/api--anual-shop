import Notification from "../notification/notification";

export default abstract class ObjectValue {

   private _notification: Notification;

   constructor() {
      this._notification = new Notification();
   }

   get notification() {
      return this._notification;
   }
}