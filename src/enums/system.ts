/* eslint-disable @typescript-eslint/no-redeclare */

/**
 * localStorageで使うキー一覧
 */

export const LocalStorageKeys = {
  LoggedInUser: 'loggedInUser',
  TimezoneId: 'timezoneId',
  Theme: 'theme',
  LocaleName: 'localeName',
  DeviceRegistrationToken: 'deviceRegistrationToken',
} as const

export type LocalStorageKeys =
  typeof LocalStorageKeys[keyof typeof LocalStorageKeys]

/**
 * Format type date
 */
export const DateFormat = {
  YYYYMMDDHHmmss: 'YYYY/MM/DD HH:mm:ss',
  YYYYMMDDHHmm: 'YYYY/MM/DD HH:mm',
  YYYYMMDD: 'YYYY/MM/DD',
  HHmmss: 'HH:mm:ss',
  HHmm: 'HH:mm',
} as const

export type DateFormat = typeof DateFormat[keyof typeof DateFormat]

/**
 * 日付フォーマット(JSON用)
 */
export const JsonDateFormat = {
  YYYYMMDDHHmmss: 'YYYY-MM-DD HH:mm:ss',
  YYYYMMDDHHmm: 'YYYY-MM-DD HH:mm',
  YYYYMMDD: 'YYYY-MM-DD',
  HHmmss: 'HH:mm:ss',
  HHmm: 'HH:mm',
} as const

/**
 * 日付フォーマット(CrewDatePicker用)
 */
export const DatePickerDateFormat = {
  YYYYMMDD: 'yyyy/MM/dd',
  YYYYMMDDHHmm: 'yyyy/MM/dd HH:mm',
}
export type JsonDateFormat = typeof JsonDateFormat[keyof typeof JsonDateFormat]

/**
 * デバイスのタイプ
 */

export const DeviceType = {
  Fcm: 'fcm',
  Apns: 'apns',
} as const

export type DeviceType = typeof DeviceType[keyof typeof DeviceType]
