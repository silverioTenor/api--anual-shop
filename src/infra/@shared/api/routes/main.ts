import { Router } from 'express';
import userRouter from '@infra/aggregate/user/api/route/user.routes';

const routes = Router();

routes.use('/user', userRouter);

export default routes;