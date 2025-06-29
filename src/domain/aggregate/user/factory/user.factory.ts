import { UserBuilder } from "../entity/user";
import { IUser } from "../interface/user.interface";

export default class UserFactory {
   static create(payload: any): IUser {
      if (!payload) {
         throw new Error('Invalid Data!');
      }

      const user = new UserBuilder()
                        .withName(payload?.name)
                        .withEmail(payload?.email)
                        .withDocument(payload?.document)
                        .withPhone(payload?.phone)
                        .withPassword(payload?.password)
                        .build(payload?.id);

      if (payload?.address) {
         user.changeAddress(payload?.address);
      }

      return user;
   }
}