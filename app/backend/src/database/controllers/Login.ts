import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ILogin from '../interfaces/Login';
import LoginService from '../services/Login';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInfo: ILogin = req.body;

    const user = await LoginService.login(userInfo);

    if (user.error) return next(user);

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default {
  login,
};
