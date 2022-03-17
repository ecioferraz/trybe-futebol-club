import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces';
import { validateEmail, validatePassword } from '../utils';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;

  const validUsername = validateEmail(email);
  if (validUsername) return next(validUsername);

  const validPassword = validatePassword(password);
  if (validPassword) return next(validPassword);

  next();
};
