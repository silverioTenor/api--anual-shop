import { Request, Response } from 'express';

export default abstract class UserController {
   static async create(req: Request, res: Response) {
      throw new Error('method not implemented yet!');
   }

   static async find(req: Request, res: Response) {
      throw new Error('method not implemented yet!');
   }

   static async changeEmail(req: Request, res: Response) {
      throw new Error('method not implemented yet!');
   }

   static async changeAddress(req: Request, res: Response) {
      throw new Error('method not implemented yet!');
   }
}
