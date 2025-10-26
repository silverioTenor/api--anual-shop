export interface InputCreateProductDTO {
   name: string;
   description: string;
   oldPrice: number;
   price: number;
   quantity: number;
   userId: string;
   categoryId: string;
}

export interface OutputCreateProductDTO {
   id: string;
}
