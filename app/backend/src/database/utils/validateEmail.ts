import { StatusCodes } from 'http-status-codes';
import { blank, checkEmail } from './helpers';

export default (email: string) => {
  switch (true) {
    case blank(email): return {
      code: StatusCodes.BAD_REQUEST,
      error: 'Email is required',
    };
    case checkEmail(email): return {
      code: StatusCodes.BAD_REQUEST,
      error: 'Email must be a valid email',
    };
    default: return false;
  }
};
