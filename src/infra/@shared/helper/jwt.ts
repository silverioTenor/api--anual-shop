import jwt from 'jsonwebtoken';
import { config } from '@infra/@shared/config/config';

export class Jwt {
   static sign(payload: object, options?: jwt.SignOptions): string {
      return jwt.sign(payload, config.auth.jwt.secret!, {
         ...options,
         expiresIn: config.auth.jwt.expiresIn as any,
         algorithm: config.auth.jwt.algorithm as jwt.Algorithm,
      });
   }

   static verify(token: string, options?: jwt.VerifyOptions) {
      return jwt.verify(token, config.auth.jwt.secret!, options);
   }

   static decode(token: string, options?: jwt.DecodeOptions) {
      return jwt.decode(token, options);
   }
}
