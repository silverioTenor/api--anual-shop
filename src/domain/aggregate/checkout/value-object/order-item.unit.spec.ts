import OrderItemBuilder from './order-item';

describe('Unit tests for Order Item', () => {
   it('should create an order item', () => {
      const orderItem = new OrderItemBuilder()
                              .withProductId(crypto.randomUUID())
                              .withProductName('Product 1')
                              .withPrice(100)
                              .withQuantity(4)
                              .build();

      expect(orderItem).toBeDefined();
      expect(orderItem).toEqual({
         _productId: expect.any(String),
         _productName: 'Product 1',
         _price: 100,
         _quantity: 4,
         _notification: {
            errors: [],
         },
      });
   });

   it('should throw an error when creating an order item without props', () => {
      expect(() => new OrderItemBuilder().build()).toThrow('OrderItem: produc id is required!,\nOrderItem: product name is required!,\nOrderItem: price must be greater than 0!');
   });
});
