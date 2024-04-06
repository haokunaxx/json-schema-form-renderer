// export enum ResultType {
//   SUCCESS = 'success',
//   ERROR = 'error',
//   NOT_FOUND = 'not found',
//   WARNING = 'warning'
// }

export enum ResultCode {
  SUCCESS = 2000,
  FAIL = 2001,
  UNAUTHORIZED = 2002,
  FORBIDDEN = 2003,
  NOT_FOUND = 2004
}

export interface Result<T = any> {
  code: ResultCode
  message: string
  result: T
}
