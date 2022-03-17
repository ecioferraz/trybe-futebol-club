import * as bcrypt from 'bcryptjs';
import { StatusCode } from '../interfaces';
import { createToken } from '../auth/jwt';
import ILogin from '../interfaces/Login';
import User from '../models/User';

const login = async ({ email, password }: ILogin) => {
  const user = await User.findOne({ where: { email } });

  if (!user) return { code: StatusCode.UNAUTHORIZED, error: 'Email is not invalid' };
  console.log(password, user.password);
  const isNotValid = bcrypt.compareSync(password, user.password);

  if (isNotValid) return { code: StatusCode.UNAUTHORIZED, error: 'Password is not valid' };

  const token = createToken({
    id: user.id,
    username: user.username,
    role: user.role,
    email,
  });

  return { user, token };
};

export default {
  login,
};
