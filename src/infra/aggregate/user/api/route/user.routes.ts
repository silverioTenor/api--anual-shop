import { Request, Response, Router } from 'express';
import UserController from '../controller/user.controller';

const userRouter = Router();

userRouter.post('/create', async (req: Request, res: Response) => {
   await UserController.create(req, res);
});

userRouter.get('/:id', async (req: Request, res: Response) => {
   await UserController.create(req, res);
});

userRouter.patch('/change-email', async (req: Request, res: Response) => {
   await UserController.changeEmail(req, res);
});

userRouter.patch('/change-address', async (req: Request, res: Response) => {
   await UserController.changeAddress(req, res);
});

export default userRouter;
