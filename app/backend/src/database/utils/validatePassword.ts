import { StatusCode, IError } from '../interfaces';
import { blank } from './helpers';

export default (password: string): IError | boolean => {
  switch (true) {
    case blank(password): return {
      code: StatusCode.UNAUTHORIZED,
      message: 'All fields must be filled',
    };
    default: return false;
  }
};
