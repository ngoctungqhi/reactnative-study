const ApiErrorCode = {
  ValidationFailed: 'validationFailed',
  DetectedUpdateByOthers: 'detectedUpdateByOthers',
  JwtMissingError: 'jwtMissingError',
  JwtInvalidError: 'jwtInvalidError',
  InvalidPassword: 'invalidPassword',
  InvalidPasswordLength: 'invalidPasswordLength',
  UnauthorizedError: 'unauthorizedError',
  Unknown: 'unknown',
} as const
type ApiErrorCode = (typeof ApiErrorCode)[keyof typeof ApiErrorCode]

type ApiErrorBase = {
  code: ApiErrorCode
}

export interface ApiErrorValidationFailed extends ApiErrorBase {
  code: 'validationFailed'
  errors: {
    code: string
    field: string
    message: string
  }[]
}

export interface ApiErrorDetectedUpdatedByOthers extends ApiErrorBase {
  code: 'detectedUpdateByOthers'
}

export interface ApiErrorJwtMissing extends ApiErrorBase {
  code: 'jwtMissingError'
}

export interface ApiErrorInvalidPassword extends ApiErrorBase {
  code: 'invalidPassword'
  policy: {
    minLength: number
    maxLength: number
    complexity: boolean
    symbols: string
  }
}

export interface ApiErrorUnknown extends ApiErrorBase {
  code: 'unknown'
}
export interface ApiErrorJwtInvalid extends ApiErrorBase {
  code: 'jwtInvalidError'
}

export interface ApiInvalidPasswordLength extends ApiErrorBase {
  code: 'invalidPasswordLength'
}

type ApiError =
  | ApiErrorValidationFailed
  | ApiErrorDetectedUpdatedByOthers
  | ApiErrorJwtMissing
  | ApiErrorJwtInvalid
  | ApiErrorInvalidPassword
  | ApiInvalidPasswordLength
  | ApiErrorUnknown

export type ApiErrorResult = {
  data: ApiError
  status: number
}

export const IsApiErrorResultValidationFailed = (
  error: ApiError
): error is ApiErrorValidationFailed =>
  error.code === ApiErrorCode.ValidationFailed

export const IsApiErrorResultDetectedUpdatedByOthers = (
  error: ApiError
): error is ApiErrorDetectedUpdatedByOthers =>
  error.code === ApiErrorCode.DetectedUpdateByOthers

export const IsApiErrorUnknown = (error: ApiError): error is ApiErrorUnknown =>
  error.code === ApiErrorCode.Unknown

export const IsApiErrorJwtMissingError = (
  error: ApiError
): error is ApiErrorJwtMissing => error.code === ApiErrorCode.JwtMissingError

export const IsApiErrorJwtInvalidError = (
  error: ApiError
): error is ApiErrorJwtInvalid => error.code === ApiErrorCode.JwtInvalidError
export const IsApiErrorInvalidPassword = (
  error: unknown
): error is ApiErrorInvalidPassword =>
  typeof error === 'object' &&
  error != null &&
  (error as ApiErrorInvalidPassword).code === ApiErrorCode.InvalidPassword &&
  typeof (error as ApiErrorInvalidPassword).policy === 'object' &&
  (error as ApiErrorInvalidPassword).policy != null &&
  typeof (error as ApiErrorInvalidPassword).policy.minLength === 'number' &&
  typeof (error as ApiErrorInvalidPassword).policy.complexity === 'boolean' &&
  typeof (error as ApiErrorInvalidPassword).policy.symbols === 'string'

export function isApiErrorResult(error: unknown): error is ApiErrorResult {
  return (
    typeof error === 'object' &&
    error != null &&
    (error as ApiErrorResult).status !== undefined &&
    (error as ApiErrorResult).data !== undefined &&
    typeof (error as ApiErrorResult).data.code === 'string'
  )
}

export const IsApiErrorInvalidPasswordLength = (
  error: ApiError
): error is ApiInvalidPasswordLength =>
  error.code === ApiErrorCode.InvalidPasswordLength
