import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces';

export default class MidError {
  private errorCode: number;

  public handleError(err: IError, _req: Request, res: Response, _next: NextFunction) {
    this.errorCode = err.code;

    const status = err.code || 500;

    const error = err.error || 'Internal server error';
    res.status(status).json({ error });
  }
}
