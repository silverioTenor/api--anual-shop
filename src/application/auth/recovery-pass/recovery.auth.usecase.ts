import { inject, injectable } from 'tsyringe';
import IUserRepository from '@domain/aggregate/user/repository/repository.interface';
import { InputRecoveryPassDTO, OutputRecoveryPassDTO } from './recovery.auth.dto';
import { mailTemplateConfig } from '@infra/@shared/config/mail/template.config';
import { MailProvider } from '@infra/provider/mail/mailtrap/mail-provider';
import * as handlebars from 'handlebars';

@injectable()
export default class RecoveryPassUseCase {
   constructor(
      @inject('UserRepository')
      private readonly userRepository: IUserRepository,
      @inject('MailProvider')
      private readonly mailProvider: MailProvider,
   ) {}

   async execute({ email }: InputRecoveryPassDTO): Promise<OutputRecoveryPassDTO> {
      const foundUser = await this.userRepository.findByEmail(email);

      if (!foundUser) {
         throw new Error('User not found');
      }

      const { templateDefault, recoveryPass } = mailTemplateConfig;
      const templateData = { ...templateDefault, ...recoveryPass };

      templateData.to = foundUser.email;
      templateData.body.userName = foundUser.name;

      await this.mailProvider.sendMail({
         to: templateData.to,
         subject: templateData.subject,
         template: 'recovery-pass',
         variables: templateData,
      });

      return {
         message: 'Password recovery email sent successfully!',
      }
   }
}
