import { StatusCodes } from 'http-status-codes';
import { createToken } from '../auth/jwt';
import ILogin from '../interfaces/Login';
import User from '../models/User';

const login = async ({ email }: ILogin) => {
  const user = await User.findOne({
    where: { email },
    attributes: { exclude: ['password'] },
  });

  if (!user) return { code: StatusCodes.UNAUTHORIZED, error: 'Email or password invalid' };

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
