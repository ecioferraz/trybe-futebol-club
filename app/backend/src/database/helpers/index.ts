export default class Helpers {
  public static blank = (value: string) => !value;

  public static lengthIsLessThan = (value: string, maxLength: number) => value.length < maxLength;

  public static checkEmail = (email: string) =>
    !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/.test(email));
}
