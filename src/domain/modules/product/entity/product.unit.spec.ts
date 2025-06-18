import ProductBuilder from './product';

describe('Unit Test for Product', () => {
   it('should create a product', () => {
      const product = new ProductBuilder()
         .withName('Product 1')
         .withDescription('Some description')
         .withPrice(100)
         .withQuantity(5)
         .build();

      product.activate();

      expect(product).toBeDefined();
      expect(product).toEqual({
         _id: expect.any(String),
         _name: 'Product 1',
         _price: 100,
         _description: 'Some description',
         _oldPrice: 0,
         _quantity: 5,
         _active: true,
         _userId: '',
         _categoryId: '',
         _notification: {
            errors: [],
         },
      });
   });

   it('should throw an error when no one of the required fields is missing', () => {
      expect(() => new ProductBuilder().build()).toThrow(
         `Product: name is required!,\nProduct: name must be at least 3 characters,\nProduct: description is required!,\nProduct: description must be at least 3 characters`,
      );
   });

   it('should throw an error when quantity is less than or equal to zero', () => {
      expect(() =>
         new ProductBuilder()
            .withName('Product 1')
            .withDescription('Some description')
            .withQuantity(-1)
            .build(),
      ).toThrow('Product: quantity must be greater than or equal to 1');

      expect(() =>
         new ProductBuilder()
            .withName('Product 1')
            .withDescription('Some description')
            .withQuantity(0)
            .build(),
      ).toThrow('Product: quantity must be greater than or equal to 1');
   });

   it('should throw an error when price is less than zero', () => {
      expect(() =>
         new ProductBuilder()
            .withName('Product 1')
            .withDescription('Some description')
            .withPrice(10)
            .withQuantity(1)
            .build()
            .changePrice(-100),
      ).toThrow('Product: price must be greater than zero');
   });

   it('should throw an error when trying to activate a product with quantity less than or equal to zero', () => {
      const product = new ProductBuilder()
         .withName('Product 1')
         .withDescription('Some description')
         .withPrice(10)
         .withQuantity(10)
         .build();

      product.changeQuantity(0);

      expect(() => product.activate()).toThrow(
         'Product: cannot activate product with price or quantity less than or equal to zero',
      );
   }
   );

   it('should throw an error when trying to activate a product thats already active', () => {
      const product = new ProductBuilder()
         .withName('Product 1')
         .withDescription('Some description')
         .withPrice(10)
         .withQuantity(1)
         .build();

      product.activate();

      expect(() => product.activate()).toThrow(
         'Product: product is already active',
      );
   }
   );
});
