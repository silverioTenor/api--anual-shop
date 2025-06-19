import { PaymentStatus } from '../enum/payment.enum';
import { IPaymentMethod } from '../interface/payment.interface';
import PaymentBuilder from './payment';

describe('Unit tests for Payment', () => {
   it('should make a new payment', () => {
      const paymentMethod = {
         id: crypto.randomUUID(),
         name: 'CreditCard',
         active: true,
      } as IPaymentMethod;

      const payment = new PaymentBuilder()
                           .withOrderId(crypto.randomUUID())
                           .withMethod(paymentMethod)
                           .withStatus(PaymentStatus.ACEPTED)
                           .build();

      expect(payment).toBeDefined();
      expect(payment).toEqual({
         _orderId: expect.any(String),
         _method: {
            id: expect.any(String),
            name: 'CreditCard',
            active: true,
         },
         _status: PaymentStatus.ACEPTED,
         _notification: {
            errors: []
         }
      });
   });

   it('should throw an error when creating a new payment without props', () => {
      expect(() => new PaymentBuilder().build()).toThrow('Payment: user id is required!,\nPayment: status is required!');
   });
});
