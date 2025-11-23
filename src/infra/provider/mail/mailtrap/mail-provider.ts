import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { MailtrapClient } from 'mailtrap';
import Handlebars from 'handlebars';
import { IMailProvider, ISendMailData, VariableValue } from '@domain/provider/mail/mail-provider.interface';
import { config } from '../../../@shared/config/config';

export class MailProvider implements IMailProvider {
   private client: MailtrapClient;

   private senderMail: string;

   constructor() {
      this.client = new MailtrapClient({
         token: config.mailtrap.apiKey!,
         sandbox: config.mailtrap.useSandbox,
         testInboxId: config.mailtrap.inboxId,
      });

      this.senderMail = config.mailtrap.sender;
   }

   async sendMail(data: ISendMailData): Promise<void> {
      const html = await this.compileTemplate(data.template, data.variables || {});

      await this.client.send({
         from: {
            email: this.senderMail,
            name: 'Anual Shop',
         },
         to: [
            {
               email: data.to,
            },
         ],
         subject: data.subject,
         html,
         attachments: data.attachments?.map(att => ({
            filename: att.filename,
            content: att.content,
         })),
      });
   }

   private async compileTemplate(
      templateName: string,
      variables: Record<string, VariableValue>,
   ): Promise<string> {
      const templatePath = path.resolve(
         __dirname,
         '..',
         '..',
         '..',
         'template',
         'mail',
         `${templateName}.hbs`,
      );
      const templateContent = await readFile(templatePath, 'utf-8');

      const template = Handlebars.compile(templateContent);
      return template(variables);
   }
}
