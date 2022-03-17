export const blank = (value: string | number | number[]) => !value && value !== 0;

// export const checkType = (value: string | number, type: string) => typeof value !== type;

export const lengthIsLessThan = (value: string, maxLength: number) => value.length < maxLength;

// export const valueIsLessThan = (value: number) => value <= 0;

// export const notAnArray = (values: number[]) => !Array.isArray(values);

// export const empty = (values: number[]) => !values.length;

export const checkEmail = (email: string) =>
  !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/.test(email));
