import { Request, Response, Router } from 'express';
import ProductController from '../controller/product.controller';
const productRouter = Router();
productRouter.post('/create', async (req: Request, res: Response) => {
   await ProductController.create(req, res);
});
productRouter.get('/:id', async (req: Request, res: Response) => {
   await ProductController.find(req, res);
});
export default productRouter;
