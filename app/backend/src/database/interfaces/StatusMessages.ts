export enum StatusCode {
  OK = 200,
  CREATED,
  BAD_REQUEST = 400,
  UNAUTHORIZED,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
}

export interface IError {
  code: number,
  error: string,
}
