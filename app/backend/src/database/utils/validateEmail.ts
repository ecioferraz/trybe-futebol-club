import { IError, StatusCode } from '../interfaces';
import { blank, checkEmail } from './helpers';

export default (email: string): IError | boolean => {
  switch (true) {
    case blank(email): return {
      code: StatusCode.UNAUTHORIZED,
      message: 'All fields must be filled',
    };
    case checkEmail(email): return {
      code: StatusCode.UNAUTHORIZED,
      message: 'Incorrect email or password',
    };
    default: return false;
  }
};
