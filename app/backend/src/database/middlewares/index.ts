import { Request, Response, NextFunction } from 'express';
import { IError, ILogin, StatusCode } from '../interfaces';
import Helpers from '../helpers';

export default class Middlewares {
  public static error = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.code || 500;

    const message = err.message || 'Internal server error';
    res.status(status).json({ message });
  };

  public static validateLogin = (req: Request, _res: Response, next: NextFunction) => {
    const { email, password }: ILogin = req.body;

    const validEmail = Helpers.validateEmail(email);
    if (validEmail) return next(validEmail);

    const validPassword = Helpers.validatePassword(password);
    if (validPassword) return next(validPassword);

    next();
  };

  public static checkEqualTeams = (req: Request, _res: Response, next: NextFunction) => {
    const { awayTeam, homeTeam } = req.body;

    if (awayTeam === homeTeam) {
      return next({
        code: StatusCode.UNAUTHORIZED,
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    next();
  };
}
