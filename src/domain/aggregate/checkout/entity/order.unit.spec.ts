import { OrderStatus } from '../enum/order.enum';
import { PaymentStatus } from '../enum/payment.enum';
import OrderItemBuilder from '../entity/order-item';
import PaymentBuilder from '../value-object/payment';
import OrderBuilder from './order';

describe('Unit tests for Order', () => {
   it('should create an order', () => {
      const order = new OrderBuilder()
                           .withUserId(crypto.randomUUID())
                           .withStatus(OrderStatus.AWAITING_PAYMENT)
                           .build();

      expect(order).toBeDefined();
      expect(order).toEqual({
         _id: expect.any(String),
         _userId: expect.any(String),
         _status: OrderStatus.AWAITING_PAYMENT,
         _payment: null,
         _items: [],
         _notification: {
            errors: [],
         },
      });
   });

   it('should throw an error when creating an order without props', () => {
      expect(() => new OrderBuilder().build()).toThrow('Order: user id is required!,\nOrder: field must be an uuid!,\nOrder: status is required!');
   });

   it('should add payment', () => {
      const order = new OrderBuilder()
                           .withUserId(crypto.randomUUID())
                           .withStatus(OrderStatus.AWAITING_PAYMENT)
                           .build(crypto.randomUUID());

      const payment = new PaymentBuilder()
      .withOrderId(order.id)
      .withMethod({
         id: crypto.randomUUID(),
         name: 'CreditCard',
         active: true,
      })
      .withStatus(PaymentStatus.ACEPTED)
      .build();

      order.addPayment(payment);

      expect(order.payment).toStrictEqual(payment);
   });

   it('should throw an error when adding payment with different order id ', () => {
      const order = new OrderBuilder()
                           .withUserId(crypto.randomUUID())
                           .withStatus(OrderStatus.AWAITING_PAYMENT)
                           .build(crypto.randomUUID());

      const payment = new PaymentBuilder()
      .withOrderId(crypto.randomUUID())
      .withMethod({
         id: crypto.randomUUID(),
         name: 'CreditCard',
         active: true,
      })
      .withStatus(PaymentStatus.ACEPTED)
      .build();

      expect(() => order.addPayment(payment)).toThrow('Order: payment does not belong to the order!');
   });

   it('should throw an error when adding payment with null value ', () => {
      const order = new OrderBuilder()
                           .withUserId(crypto.randomUUID())
                           .withStatus(OrderStatus.AWAITING_PAYMENT)
                           .build(crypto.randomUUID());

      expect(() => order.addPayment(null as any)).toThrow('Order: payment cannot be void!');
   });

   it('should add items', () => {
      const order = new OrderBuilder()
                           .withUserId(crypto.randomUUID())
                           .withStatus(OrderStatus.AWAITING_PAYMENT)
                           .build(crypto.randomUUID());

      const orderItem1 = new OrderItemBuilder()
                              .withOrderId(order.id)
                              .withProductId(crypto.randomUUID())
                              .withProductName('Product 1')
                              .withPrice(100)
                              .withQuantity(3)
                              .build();

      const orderItem2 = new OrderItemBuilder()
                              .withOrderId(order.id)
                              .withProductId(crypto.randomUUID())
                              .withProductName('Product 2')
                              .withPrice(90)
                              .withQuantity(1)
                              .build();

      const items = [orderItem1, orderItem2];

      order.addItems(items);

      expect(order.items.length).toBe(2);
      expect(order.items).toStrictEqual(items);
   });

   it('should throw an error when adding items without items', () => {
      const order = new OrderBuilder()
                           .withUserId(crypto.randomUUID())
                           .withStatus(OrderStatus.AWAITING_PAYMENT)
                           .build(crypto.randomUUID());

      expect(() => order.addItems([])).toThrow('Order: items cannot be void!');
   });

   it('should throw an error when adding items without items', () => {
      const order = new OrderBuilder()
                           .withUserId(crypto.randomUUID())
                           .withStatus(OrderStatus.AWAITING_PAYMENT)
                           .build(crypto.randomUUID());

      const orderItem = new OrderItemBuilder()
                              .withOrderId(crypto.randomUUID())
                              .withProductId(crypto.randomUUID())
                              .withProductName('Product 1')
                              .withPrice(100)
                              .withQuantity(3)
                              .build();

      

      expect(() => order.addItems([orderItem])).toThrow(
         'Order: order id does not belong to the order!'
      );
   });

   it('should return price total', () => {
      const order = new OrderBuilder()
                           .withUserId(crypto.randomUUID())
                           .withStatus(OrderStatus.AWAITING_PAYMENT)
                           .build(crypto.randomUUID());

      const orderItem1 = new OrderItemBuilder()
                              .withOrderId(order.id)
                              .withProductId(crypto.randomUUID())
                              .withProductName('Product 1')
                              .withPrice(100)
                              .withQuantity(3)
                              .build();

      const orderItem2 = new OrderItemBuilder()
                              .withOrderId(order.id)
                              .withProductId(crypto.randomUUID())
                              .withProductName('Product 2')
                              .withPrice(90)
                              .withQuantity(1)
                              .build();

      const items = [orderItem1, orderItem2];

      order.addItems(items);

      expect(order.items.length).toBe(2);
      expect(order.total()).toBe(390);
   });
});
