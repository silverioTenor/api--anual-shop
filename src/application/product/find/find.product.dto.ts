export class InputFindProductDTO {
   id!: string;
}

export class OutputFindProductDTO {
   id!: string;
   name!: string;
   description!: string;
   oldPrice!: number;
   price!: number;
   quantity!: number;
   active!: boolean;
   userId!: string;
   categoryId!: string;
   category!: {
      id: string;
      name: string;
   }
}
