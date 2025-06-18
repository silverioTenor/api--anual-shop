import Notification from "./notification";

describe('Unit tests for Notification', () => {
   it('should create an empty notification', () => {
      const notification = new Notification();

      expect(notification.hasErrors()).toBe(false);
      expect(notification.getErrors()).toEqual([]);
   });
   
   it('should add an error to the notification', () => {
      const notification = new Notification();

      const error = { message: 'error message', context: 'TestContext' };

      notification.addError(error);

      expect(notification.hasErrors()).toBe(true);
      expect(notification.getErrors()).toEqual([error]);
   });
   
   it('should return messages for a specific context', () => {
      const notification = new Notification();

      const error1 = { message: 'error message 1', context: 'Context1' };
      const error2 = { message: 'error message 2', context: 'Context2' };

      notification.addError(error1);
      notification.addError(error2);
      
      expect(notification.messages('Context1')).toBe('Context1: error message 1');
      expect(notification.messages('Context2')).toBe('Context2: error message 2');
   });
   
   it('should return all messages when no context is specified', () => {
      const notification = new Notification();

      const error1 = { message: 'error message 1', context: 'Context1' };
      const error2 = { message: 'error message 2', context: 'Context2' };
      
      notification.addError(error1);
      notification.addError(error2);
      
      expect(notification.messages()).toBe('Context1: error message 1,\nContext2: error message 2');
   });
});