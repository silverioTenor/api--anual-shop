import Notification from "../notification/notification";

export default abstract class Entity {

   private _id: string;
   private _notification: Notification;

   constructor(id?: string) {
      // this._id = !!id ? id : crypto.randomUUID();
      this._id = id || '';
      this._notification = new Notification();
   }

   get id(): string {
      return this._id;
   }

   get notification() {
      return this._notification;
   }
}