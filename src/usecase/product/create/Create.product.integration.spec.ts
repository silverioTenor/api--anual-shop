import ProductRepository from "@infra/aggregate/product/db/prisma/repository/product.repository";
import UserRepository from "@infra/aggregate/user/db/prisma/repository/user.repository";
import CreateProductUseCase from "./Create.product.usecase";
import CreateUserUseCase from "../../user/create/Create.user.usecase";
import CategoryModel from "@infra/aggregate/product/db/prisma/model/category.model";

describe('Integration test for Product', () => {
   it('should create a product', async () => {
      const productRepository = new ProductRepository();
      const userRepository = new UserRepository();
      const createProductUseCase = new CreateProductUseCase(productRepository);

      const createUserUseCase = new CreateUserUseCase(userRepository);

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
            name: 'Category Test Create',
         }
      });

      const inputCreateProductDTO = {
         name: "Product Test Create",
         description: "Description Test",
         oldPrice: 100,
         price: 80,
         quantity: 10,
         userId: outputCreateUserDTO.id,
         categoryId: category.id,
      };

      const output = await createProductUseCase.execute(inputCreateProductDTO);

      expect(output).toBeDefined();
      expect(output).toHaveProperty('id');
   });
});
