import i18n from 'i18next'
import { resources } from './resources'
import { initReactI18next } from 'react-i18next'
import { Language } from 'enums/i18n'

// TODO:resourcesの型をtまで適用する
// https://react.i18next.com/latest/typescript
// https://break-tmc.atlassian.net/browse/CREW-1299?atlOrigin=eyJpIjoiYmMyNGY3ZmM4N2IxNGY1MTkyNDEwNTg0NTM1MDc5ZmEiLCJwIjoiaiJ9

// TODO:i18nextのresources、interpolationを棚卸しする
// https://break-tmc.atlassian.net/browse/CREW-1300?atlOrigin=eyJpIjoiMzRiMDRkMGE4NWZiNDcyZmFhZTZmZmJmNzI5ODdhZWIiLCJwIjoiaiJ9

i18n.use(initReactI18next).init({
  lng: Language.Ja,
  fallbackLng: Language.Ja,
  resources,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
})

export const DefaultTimeStampFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}

export const DefaultDateTimeFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
}

export const DefaultDateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}

export const DefaultShortDateFormat: Intl.DateTimeFormatOptions = {
  month: '2-digit',
  day: '2-digit',
}

export const DefaultTimeFormat: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}

export const DefaultShortTimeFormat: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
}

export const DefaultRelativeTimeFormat: Intl.RelativeTimeFormatOptions = {
  numeric: 'auto',
  style: 'narrow',
}

export const DefaultNumberFormat: Intl.NumberFormatOptions = {}

export const DefaultCurrencyFormat: Intl.NumberFormatOptions = {
  style: 'currency',
  // currency: 'JPY',

  // 通貨は言語やロケールで決定されるとは限らない
  // 呼び出し側で指定すること
  // usage: t('format.currency', { value: 123456789, currency: 'JPY' })
}

// 例 2022/01/01 09:00:00
i18n.services.formatter?.add('timestamp', (value, lng, options) => {
  return Intl.DateTimeFormat(lng, DefaultTimeStampFormat).format(
    Date.parse(value)
  )
})

// 例 2022/01/01 09:00
i18n.services.formatter?.add('datetime', (value, lng, options) => {
  return Intl.DateTimeFormat(lng, DefaultDateTimeFormat).format(
    Date.parse(value)
  )
})

// 例 2022/01/01
i18n.services.formatter?.add('date', (value, lng, options) => {
  return Intl.DateTimeFormat(lng, { ...DefaultDateFormat, ...options }).format(
    Date.parse(value)
  )
})

// 例 01/01
i18n.services.formatter?.add('shortdate', (value, lng, options) => {
  return Intl.DateTimeFormat(lng, {
    ...DefaultShortDateFormat,
    ...options,
  }).format(Date.parse(value))
})

// 例 09:00:00
i18n.services.formatter?.add('time', (value, lng, options) => {
  return Intl.DateTimeFormat(lng, { ...DefaultTimeFormat, ...options }).format(
    Date.parse(value)
  )
})

// 例 09:00
i18n.services.formatter?.add('shorttime', (value, lng, options) => {
  return Intl.DateTimeFormat(lng, {
    ...DefaultShortTimeFormat,
    ...options,
  }).format(Date.parse(value))
})

// 例 5日後, 5日前
i18n.services.formatter?.add('relativetime', (value, lng, options) => {
  const rtf = new Intl.RelativeTimeFormat(lng, {
    ...DefaultShortTimeFormat,
    ...options,
  })
  return rtf.format(value, 'day')
})

// 例
// （同じ日の場合） 2021/11/30 10:30 - 13:00
// （違う日の場合） 2021/11/30 10:30 - 2021/12/01 19:30
i18n.services.formatter?.add('daterange', (value, lng, options) => {
  const startDate = new Date(value.start)
  const endDate = new Date(value.end)
  const isStartEndSameDay =
    startDate.getDate() === endDate.getDate() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()

  const startFormat = Intl.DateTimeFormat(lng, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(Date.parse(value.start))

  const endFormat = isStartEndSameDay
    ? Intl.DateTimeFormat(lng, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(Date.parse(value.end))
    : Intl.DateTimeFormat(lng, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(Date.parse(value.end))

  return `${startFormat} - ${endFormat}`
})

// 例 123,456,789
i18n.services.formatter?.add('number', (value, lng, options) => {
  return Intl.NumberFormat(lng, { ...DefaultNumberFormat, ...options }).format(
    value
  )
})

// 例 \123,456,789
i18n.services.formatter?.add('currency', (value, lng, options) => {
  if (options.currency) {
    return Intl.NumberFormat(lng, {
      ...DefaultCurrencyFormat,
      ...options,
    }).format(value)
  } else {
    // 通貨の指定がない場合は、既定の数値フォーマットで返す
    return Intl.NumberFormat(lng, DefaultNumberFormat).format(value)
  }
})

export default i18n
