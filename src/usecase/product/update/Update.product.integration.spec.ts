import ProductRepository from "@infra/aggregate/product/db/prisma/repository/product.repository";
import UserRepository from "@infra/aggregate/user/db/prisma/repository/user.repository";
import CategoryModel from "@infra/aggregate/product/db/prisma/model/category.model";
import UpdateProductUseCase from "./Update.product.usecase";
import CreateProductUseCase from "../create/Create.product.usecase";
import CreateUserUseCase from "../../user/create/Create.user.usecase";

describe('Integration test for Product', () => {
   it('should update a product', async () => {
      const productRepository = new ProductRepository();
      const userRepository = new UserRepository();

      const createUserUseCase = new CreateUserUseCase(userRepository);
      const createProductUseCase = new CreateProductUseCase(productRepository);
      const updateProductUseCase = new UpdateProductUseCase(productRepository);

      const inputCreateUserDTO = {
         name: 'William Silver',
         email: 'w.s@gmali.com',
         document: '12345678910',
         phone: '21999999999',
         password: 'abc123',
         address: undefined,
      };

      const outputCreateUserDTO = await createUserUseCase.execute(inputCreateUserDTO);

      const category = await CategoryModel.db.create({
         data: {
            name: 'Category Test Update',
         }
      });

      const inputCreateProductDTO = {
         name: "Product Test Update",
         description: "Description Test",
         oldPrice: 100,
         price: 80,
         quantity: 10,
         userId: outputCreateUserDTO.id,
         categoryId: category.id,
      };

      const outputCreateProductDTO = await createProductUseCase.execute(inputCreateProductDTO);

      const inputUpdateProductDTO = {
         id: outputCreateProductDTO.id,
         price: 120,
         oldPrice: 80,
         quantity: 9,
      }

      await updateProductUseCase.execute(inputUpdateProductDTO);

      const updatedProduct = await productRepository.find(outputCreateProductDTO.id);

      expect(updatedProduct!.price).toBe(inputUpdateProductDTO.price);
      expect(updatedProduct!.oldPrice).toBe(inputUpdateProductDTO.oldPrice);
      expect(updatedProduct!.quantity).toBe(inputUpdateProductDTO.quantity);
   });
});
