import UserRepository from "@infra/aggregate/user/db/prisma/repository/user.repository";
import ProductRepository from "@infra/aggregate/product/db/prisma/repository/product.repository";
import CategoryModel from "@infra/aggregate/product/db/prisma/model/category.model";
import ListProductUseCase from "./List.product.usecase";
import CreateUserUseCase from "../../user/create/Create.user.usecase";
import CreateProductUseCase from "../create/Create.product.usecase";
import FindProductUseCase from "../find/Find.product.usecase";

describe('Integration test for Product', () => {
   it('should list products with pagination', async () => {
      const userRepository = new UserRepository();
      const productRepository = new ProductRepository();

      const createUserUseCase = new CreateUserUseCase(userRepository);
      const createProductUseCase = new CreateProductUseCase(productRepository);
      const findProductUseCase = new FindProductUseCase(productRepository);
      const listProductsUseCase = new ListProductUseCase(productRepository);

      const inputCreateUser = {
         name: 'William Silver',
         email: 'w.s@gmali.com',
         document: '12345678910',
         phone: '21999999999',
         password: 'abc123',
         address: undefined,
      };

      const user = await createUserUseCase.execute(inputCreateUser);

      const category = await CategoryModel.db.create({
         data: { name: 'Electronics' }
      });

      const inputCreateProduct = {
         name: "Product Test",
         description: "Description Test",
         oldPrice: 100,
         price: 80,
         quantity: 10,
         userId: user.id,
         categoryId: category.id,
         category,
      };

      const product = await createProductUseCase.execute(inputCreateProduct);

      const foundProduct = await findProductUseCase.execute({ id: product.id });

      expect(foundProduct).toBeDefined();
      expect(foundProduct.id).toBe(product.id);
      expect(foundProduct.name).toBe(inputCreateProduct.name);

      const filter = {
         userId: user.id,
         categoryId: category.id,
      };

      const pagination = {
         page: 1,
         limit: 10,
      };

      const products = await listProductsUseCase.execute(filter, pagination);

      expect(products).toBeDefined();
      expect(products.data.length).toBeGreaterThan(0);
      expect(products.data).toEqual(
         expect.arrayContaining([
            expect.objectContaining({ id: product.id, name: inputCreateProduct.name })
         ])
      );

      expect(products.total).toBeGreaterThan(0);
      expect(products.page).toBe(pagination.page);
      expect(products.limit).toBe(pagination.limit);
      expect(products.totalPages).toBe(Math.ceil(products.total / pagination.limit));
   });
});
