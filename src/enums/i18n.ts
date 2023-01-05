/* eslint-disable @typescript-eslint/no-redeclare */

/**
 * 言語
 */
export const Language = {
  Ja: 'ja',
  En: 'en',
} as const

export type Language = typeof Language[keyof typeof Language]

/**
 * ロケール
 */
export const Locale = {
  JaJp: 'ja-JP',
  EnUs: 'en-US',
} as const

export type Locale = typeof Locale[keyof typeof Locale]
