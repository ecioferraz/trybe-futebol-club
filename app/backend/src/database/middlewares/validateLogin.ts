import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces';
import { validateEmail, validatePassword } from '../utils';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;

  const validEmail = validateEmail(email);
  if (validEmail) return next(validEmail);

  const validPassword = validatePassword(password);
  if (validPassword) return next(validPassword);

  next();
};
