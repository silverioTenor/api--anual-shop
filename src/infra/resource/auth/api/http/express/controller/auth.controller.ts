import { Request, Response } from 'express';
import RegisterUseCase from '@application/auth/register/register.auth.usecase';
import LoginUseCase from '@application/auth/login/login.auth.usecase';
import UserRepository from '@infra/aggregate/user/db/prisma/repository/user.repository';

export default abstract class AuthController {
   static async signup(req: Request, res: Response) {
      const registerUsecase = new RegisterUseCase(new UserRepository());
      const output = await registerUsecase.execute(req.body);

      return res.status(201).json(output);
   }

   static async signin(req: Request, res: Response) {
      const logingUsecase = new LoginUseCase(new UserRepository());
      const output = await logingUsecase.execute(req.body);

      return res.status(200).json(output);
   }

   static async recoveryPass(req: Request, res: Response) {
      throw new Error('method not implemented yet!');
   }

   static async suspend(req: Request, res: Response) {
      throw new Error('method not implemented yet!');
   }
}
