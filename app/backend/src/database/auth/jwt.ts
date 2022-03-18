import { Request, Response, NextFunction } from 'express';
import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import { StatusCode } from '../interfaces';
import IUser from '../interfaces/User';

const jwtSecret = readFileSync('jwt.evaluation.key', 'utf-8');

const createToken = (userInfo: object) =>
  jwt.sign(userInfo, jwtSecret, { expiresIn: '7d', algorithm: 'HS256' });

const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(StatusCode.UNAUTHORIZED).json({ error: 'Token not found' });
    }

    const { role } = jwt.verify(authorization, jwtSecret) as IUser;

    req.body = role;

    return next();
  } catch (_) {
    return res.status(StatusCode.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};

export {
  createToken,
  authToken,
};
