import { Request, Response, Router } from 'express';
import UserController from '../controller/user.controller';
import { auth } from '@infra/@shared/middleware/auth';

const userRouter = Router();

userRouter.post('/create', async (req: Request, res: Response) => {
   await UserController.create(req, res);
});

userRouter.get('/:id', auth(), async (req: Request, res: Response) => {
   await UserController.create(req, res);
});

userRouter.patch('/change-email', auth(), async (req: Request, res: Response) => {
   await UserController.changeEmail(req, res);
});

userRouter.patch('/change-address', auth(), async (req: Request, res: Response) => {
   await UserController.changeAddress(req, res);
});

export default userRouter;
