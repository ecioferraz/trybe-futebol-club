import * as bcrypt from 'bcryptjs';
import { StatusCode } from '../interfaces';
import { createToken } from '../auth/jwt';
import ILogin from '../interfaces/Login';
import User from '../models/User';

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

export default {
  login,
};
