import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';

export const validateRequest = (schema: z.ZodObject<any, any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(error);
      }
      return next(error);
    }
};



