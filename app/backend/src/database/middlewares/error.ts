import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces';

const midError = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.code || 500;

  const error = err.error || 'Internal server error';
  res.status(status).json({ error });
};

export default midError;
