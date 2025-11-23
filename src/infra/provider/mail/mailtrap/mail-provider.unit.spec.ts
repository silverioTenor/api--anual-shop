import { MailProvider } from './mail-provider';

describe('Test MailTrap Provider', () => {
   it('should send an email using MailTrap', async () => {
      const mailProvider = new MailProvider();

      await expect(
         mailProvider.sendMail({
            to: 'rodrigo.test@test.com',
            subject: 'Test Email',
            template: 'email-test',
            variables: {
               name: 'Rodrigo',
               email: 'rodrigo@example.com',
               environment: 'development',
               message: 'Tudo numa boa! ✌️',
               showButton: true,
               actionUrl: 'https://minhaapi.com/test',
               items: ['Item A', 'Item B', 'Item C'],
               operationId: 'op_123456789',
               timestamp: new Date().toISOString(),
            },
         }),
      ).resolves.toBeUndefined();
   });
});
