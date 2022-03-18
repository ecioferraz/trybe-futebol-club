import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../interfaces';
import ILogin from '../interfaces/Login';
import LoginService from '../services/Login';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInfo: ILogin = req.body;

    const user = await LoginService.login(userInfo);

    if (user.message) return next(user);

    return res.status(StatusCode.OK).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.body;

    return res.status(StatusCode.OK).json(role);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default {
  login,
  getRole,
};
