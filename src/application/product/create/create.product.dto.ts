export class InputCreateProductDTO {
   name!: string;
   description!: string;
   oldPrice!: number;
   price!: number;
   quantity!: number;
   userId!: string;
   categoryId!: string;
}

export class OutputCreateProductDTO {
   id!: string;
}
