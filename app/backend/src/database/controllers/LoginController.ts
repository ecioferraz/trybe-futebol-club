import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../interfaces';
import ILogin from '../interfaces/Login';
import LoginService from '../services/LoginService';

export default class LoginController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userInfo: ILogin = req.body;

      const user = await LoginService.login(userInfo);

      if (user.message) return next(user);

      return res.status(StatusCode.OK).json(user);
    } catch (error) {
      next(error);
    }
  }

  public static getRole(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;

      const role = LoginService.getRole(token);

      return res.status(StatusCode.OK).json(role);
    } catch (error) {
      next(error);
    }
  }
}
