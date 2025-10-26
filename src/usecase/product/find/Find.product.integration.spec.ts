import ProductRepository from "@infra/aggregate/product/db/prisma/repository/product.repository";
import CategoryModel from "@infra/aggregate/product/db/prisma/model/category.model";
import UserRepository from "@infra/aggregate/user/db/prisma/repository/user.repository";
import FindProductUseCase from "./Find.product.usecase";
import CreateProductUseCase from "../create/Create.product.usecase";
import CreateUserUseCase from "../../user/create/Create.user.usecase";

describe('Integration test for Product', () => {
   it('should find a product', async () => {
      const productRepository = new ProductRepository();
      const userRepository = new UserRepository();

      const createProductUseCase = new CreateProductUseCase(productRepository);
      const createUserUseCase = new CreateUserUseCase(userRepository);
      const findProductUseCase = new FindProductUseCase(productRepository);

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
            name: 'Category Test',
         }
      });

      const inputCreateProductDTO = {
         name: "Product Test",
         description: "Description Test",
         oldPrice: 100,
         price: 80,
         quantity: 10,
         userId: outputCreateUserDTO.id,
         categoryId: category.id,
      };

      const output = await createProductUseCase.execute(inputCreateProductDTO);

      const outputFind = await findProductUseCase.execute({ id: output.id });

      expect(outputFind).toBeDefined();
      expect(outputFind).toHaveProperty('id', output.id);
   });

   it('should find a product', async () => {
      const productRepository = new ProductRepository();

      const findProductUseCase = new FindProductUseCase(productRepository);

      await expect(findProductUseCase.execute({ id: 'invalid-id' }))
      .rejects.toThrow('Product not found');
   });
});
