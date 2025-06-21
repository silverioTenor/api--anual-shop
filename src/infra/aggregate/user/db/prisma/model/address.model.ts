import { prisma } from "@infra/@shared/db/prisma/client";

export default class AddressModel {
   static db = prisma.address;
}