import { Request, Response, Router } from 'express';
import AuthController from '../controller/auth.controller';

const authRouter = Router();

authRouter.post('/sign-up', async (req: Request, res: Response) => {
   await AuthController.signup(req, res);
});

authRouter.post('/sign-in', async (req: Request, res: Response) => {
   await AuthController.signin(req, res);
});

authRouter.post('/recovery-pass', async (req: Request, res: Response) => {
   await AuthController.recoveryPass(req, res);
});

authRouter.post('/suspend', async (req: Request, res: Response) => {
   await AuthController.suspend(req, res);
});

export default authRouter;
