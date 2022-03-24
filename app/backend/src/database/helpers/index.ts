import { IError, StatusCode } from '../interfaces';

export default class Helpers {
  public static blank(value: string): boolean {
    return !value;
  }

  public static lengthIsLessThan(value: string, maxLength: number): boolean {
    return value.length < maxLength;
  }

  public static checkEmail(email: string): boolean {
    return !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/.test(email));
  }

  public static validateEmail(email: string): IError | boolean {
    switch (true) {
      case this.blank(email): return {
        code: StatusCode.UNAUTHORIZED,
        message: 'All fields must be filled',
      };
      case this.checkEmail(email): return {
        code: StatusCode.UNAUTHORIZED,
        message: 'Incorrect email or password',
      };
      default: return false;
    }
  }

  public static validatePassword(password: string): IError | boolean {
    switch (true) {
      case this.blank(password): return {
        code: StatusCode.UNAUTHORIZED,
        message: 'All fields must be filled',
      };
      default: return false;
    }
  }
}
