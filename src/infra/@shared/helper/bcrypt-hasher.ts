import bcrypt from 'bcrypt';
import { config } from '@infra/@shared/config/config';

export class BcryptHasher {
   private static readonly saltRounds = config.auth.bcrypt.salt;

   static async hash(value: string): Promise<string> {
      return bcrypt.hash(value, this.saltRounds);
   }

   static async compare(value: string, hashedValue: string): Promise<boolean> {
      return bcrypt.compare(value, hashedValue);
   }
}
