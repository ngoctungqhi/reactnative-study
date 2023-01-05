import { Language, Locale } from 'enums/i18n'

/**
 * ロケールが取得出来なかった場合のデフォルトロケール
 * TODO: ブラウザの設定を持ってくるようにしたい
 * https://break-tmc.atlassian.net/browse/CREW-1297?atlOrigin=eyJpIjoiNTk5MTI5NWJmZTI5NDllN2FkMTYzMDgxOTk2NDA0ZDIiLCJwIjoiaiJ9
 * @returns
 */
export const getDefaultLocale = () => Locale.JaJp

export const isLocaleName = (v: any): v is Locale =>
  typeof v == 'string' && v in Object.values(Locale)

export const stringToLocale = (v?: string | null): Locale =>
  isLocaleName(v) ? v : getDefaultLocale()

export const getDefaultLanguage = () => Language.Ja

export const isLanguageName = (v: any): v is Language =>
  typeof v == 'string' && v in Object.values(Language)

export const stringToLanguage = (v?: string | null): Language =>
  isLanguageName(v) ? v : getDefaultLanguage()
