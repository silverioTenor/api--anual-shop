import { NextFunction, Request, Response } from "express";
import { Jwt } from "../helper/jwt";

export const auth = () => {
   return (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.headers['authorization'];

      if (!authorization) {
         res.status(401).json({ message: 'Unauthorized' });
         return;
      }

      const token = authorization.split(' ')[1];

      try {
         const payload = Jwt.verify(token);
         req.user = payload;

         next();
      } catch (error) {
         res.status(401).json({ message: 'Unauthorized' });
         return;
      }
   }
}
