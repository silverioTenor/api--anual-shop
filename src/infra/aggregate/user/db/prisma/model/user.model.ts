import { prisma } from "@infra/@shared/db/prisma/main";

// export const UserModel = prisma.user;

export default class UserModel {
   static db = prisma.users;
}