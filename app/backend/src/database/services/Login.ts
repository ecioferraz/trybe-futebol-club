import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { StatusCode } from '../interfaces';
import { createToken, jwtSecret } from '../auth/jwt';
import ILogin from '../interfaces/Login';
import User from '../models/User';
import IVerified from '../interfaces/User';

const login = async ({ email, password }: ILogin) => {
  const foundUser = await User.findOne({ where: { email } });

  if (!foundUser) return { code: StatusCode.UNAUTHORIZED, message: 'Incorrect email or password' };

  const isValid = bcrypt.compareSync(password, foundUser.password);

  if (!isValid) return { code: StatusCode.UNAUTHORIZED, message: 'Incorrect email or password' };

  const user = {
    id: foundUser.id,
    username: foundUser.username,
    role: foundUser.role,
    email,
  };

  const token = createToken(user);

  return { user, token };
};

const getRole = async (token: string) => {
  const { role } = jwt.verify(token, jwtSecret) as IVerified;

  return role;
};

export default {
  login,
  getRole,
};
