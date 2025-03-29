// backEndのomitemptyのためにオブジェクトの値の、""をnullに変換して返す
export const convertEmptyValuesToNull = (obj: {
  [key: string]: any
}): object => {
  const newObject: { [key: string]: any } = {}

  // ピュアなオブジェクトでないなら変換無し
  if (obj.constructor.name !== 'Object') {
    return obj
  }

  // 引数でもらったオブジェクトをループして返還
  Object.entries(obj).forEach(([key, value]) => {
    if (value === '') {
      // 空文字の場合はnull化
      newObject[key] = null
    } else if (value?.constructor.name === 'Object') {
      // ピュアなオブジェクトの場合は再帰
      newObject[key] = convertEmptyValuesToNull(value)
    } else {
      // そうでない場合は変換無し
      newObject[key] = value
    }
  })
  return newObject
}
