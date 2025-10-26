import { prisma } from "@infra/@shared/db/prisma/main";

export default class CategoryModel {
   static db = prisma.categories;
}
