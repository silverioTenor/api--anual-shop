import { prisma } from "@infra/@shared/db/prisma/main";

export default class AddressModel {
   static db = prisma.address;
}