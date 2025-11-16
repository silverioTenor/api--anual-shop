import { Router } from 'express';
import userRouter from '@infra/aggregate/user/api/route/user.routes';
import authRouter from '@infra/resource/auth/api/http/express/route/auth.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/user', userRouter);

export default routes;
