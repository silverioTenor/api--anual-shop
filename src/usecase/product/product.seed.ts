import IProductRepository from "@domain/aggregate/product/repository/product.interface";

export const mockProduct = {
   id: crypto.randomUUID(),
   name: "Product Test",
   description: "Description Test",
   oldPrice: 100,
   price: 80,
   quantity: 10,
   userId: crypto.randomUUID(),
   categoryId: crypto.randomUUID(),
   category: {
      id: crypto.randomUUID(),
      name: "Category Test",
   },
}

export const MockRepository = (): IProductRepository<any, any, any> => ({
   create: jest.fn(),
   update: jest.fn(),
   delete: jest.fn(),
   find: jest.fn(),
   all: jest.fn(),
});
