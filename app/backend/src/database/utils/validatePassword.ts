import { StatusCode, IError } from '../interfaces';
import { blank, lengthIsLessThan } from './helpers';

export default (password: string): IError | boolean => {
  switch (true) {
    case blank(password): return {
      code: StatusCode.BAD_REQUEST,
      error: 'Password is required',
    };
    case lengthIsLessThan(password, 6): return {
      code: StatusCode.UNPROCESSABLE_ENTITY,
      error: 'Password must be 6 characters or longer',
    };
    default: return false;
  }
};
