import { Request, Response } from 'express';

export default abstract class AuthController {
   static async signup(req: Request, res: Response) {
      throw new Error('method not implemented yet!');
   }

   static async signin(req: Request, res: Response) {
      throw new Error('method not implemented yet!');
   }

   static async recoveryPass(req: Request, res: Response) {
      throw new Error('method not implemented yet!');
   }

   static async suspend(req: Request, res: Response) {
      throw new Error('method not implemented yet!');
   }
}
