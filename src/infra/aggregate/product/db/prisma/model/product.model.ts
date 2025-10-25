import { prisma } from "@infra/@shared/db/prisma/main";

export default class ProductModel {
   static db = prisma.products;
}
