import { Request, Response, NextFunction } from 'express';
import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import { StatusCode } from '../interfaces';

const jwtSecret = readFileSync('jwt.evaluation.key', 'utf-8');

const createToken = (userInfo: object) =>
  jwt.sign(userInfo, jwtSecret, { expiresIn: '7d', algorithm: 'HS256' });

const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(StatusCode.UNAUTHORIZED).json({ error: 'Token not found' });
    }

    return next();
  } catch (_) {
    return res.status(StatusCode.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};

export {
  jwtSecret,
  createToken,
  authToken,
};
