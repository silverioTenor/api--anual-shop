export interface IMailAttachement {
   filename: string;
   content: Buffer | string;
}

export type VariableValue = string | number | boolean | string[] | Record<string, any>;

export interface ISendMailData {
   to: string;
   subject: string;
   variables?: Record<string, VariableValue>;
   template: string;
   attachments?: IMailAttachement[];
}

export interface IMailProvider {
   sendMail(data: ISendMailData): Promise<void>;
}
