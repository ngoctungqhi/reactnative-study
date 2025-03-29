import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  FetchArgs,
  FetchBaseQueryArgs,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import {
  APP_VERSION,
  apiBaseUrl,
  commonAppApiBaseUrl,
} from '@crew/configs/constants'
import qs from 'qs'
import { Mutex } from 'async-mutex'

import dayjs from '@crew/modules/dayjs'
import { HttpStatusCode } from '@crew/enums/system'

import { convertEmptyValuesToNull } from './utils'

const isFetchArgs = (v: any): v is FetchArgs => 'url' in v
const mutex = new Mutex()

/**
 * コールバックが設定出来るBaseQueryのイベント
 */
export const Event = {
  /**
   * リクエストに成功した
   */
  Success: 'success',
  /**
   * アクセストークンのrefreshに失敗した
   */
  RefreshFailed: 'refresh_failed',
  /**
   * アプリバージョンが古くアップデートが必要
   */
  UpgradeRequired: 'upgrade_required',
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Event = (typeof Event)[keyof typeof Event]

/**
 * イベントコールバックの型
 */
export type EventHandler = () => void

/**
 * イベントコールバックのリスト
 */
const eventCallback: { [key in Event]: Set<EventHandler> } = {
  [Event.Success]: new Set(),
  [Event.RefreshFailed]: new Set(),
  [Event.UpgradeRequired]: new Set(),
}

/**
 * タイムゾーンを取得する関数を保持する変数
 */
let timezoneGetter: (() => string) | undefined

// RTKQueryのベース設定 --------------------------------------------------------
// テナントAPI用
const customBaseQuery = (
  baseArgs: FetchBaseQueryArgs
): ReturnType<typeof fetchBaseQuery> => {
  return async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: apiBaseUrl() + 'api/v1/',
      ...baseArgs,
    })

    if (isFetchArgs(args)) {
      if (args.body) {
        // backEndのomitemptyのためにbodyの""はnullに変換する
        args.body = convertEmptyValuesToNull(args.body)
      }
    }

    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    // エラーが発生していたらステータスコードに応じて処理を行う
    if (result.error) {
      // リクエストが426エラー(Upgrade Required)だった場合はアプリ更新させるためのイベントコールバックを実行する
      if (result.error.status === HttpStatusCode.UpgradeRequired) {
        eventCallback.upgrade_required.forEach((f) => f())
        return result
      }

      // リクエストが403エラー(Unauthorized、認証エラー)だった場合はアクセストークンをリフレッシュしてリトライする
      if (result.error.status === HttpStatusCode.Unauthorized) {
        if (!mutex.isLocked()) {
          // 他のリクエストはrefreshしていない、このリクエストでrefreshする
          const release = await mutex.acquire()

          try {
            const refreshOk = await refreshAccessToken()
            if (refreshOk) {
              // リフレッシュ成功、当初のクエリを再度実行する
              result = await baseQuery(args, api, extraOptions)
            }
          } finally {
            release()
          }
        } else {
          // 他のリクエストがrefreshしている、このリクエストはrefreshが終わるまで待つ
          await mutex.waitForUnlock()
          result = await baseQuery(args, api, extraOptions)
        }
      }
    }

    // 最終的にこのrequestに成功したらリクエスト成功イベントコールバックを実行する
    if (!result.error) {
      eventCallback.success.forEach((f) => f())
    }
    return result
  }
}

export const apis = createApi({
  reducerPath: 'apis',
  // キャッシュの状態に関わらず再マウント時や引数が変わった場合はrefetchさせるため、refetchOnMountOrArgChangeをtrueにする
  // https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#encouraging-re-fetching-with-refetchonmountorargchange
  refetchOnMountOrArgChange: true,
  baseQuery: customBaseQuery({
    credentials: 'include',
    prepareHeaders: (headers) => {
      // タイムゾーンをヘッダに追加
      const timezone =
        timezoneGetter?.() || // 設定されたタイムゾーン取得関数を使う
        dayjs.tz.guess() // ↑が未設定だった場合、環境から取得したタイムゾーンを使う
      headers.set('TZ', timezone)

      // アプリバージョンを格納する変数
      let appVersion: string | undefined
      try {
        // Mobileの場合はexpo-applicationからバージョンを取得する
        const Application = require('expo-application')
        appVersion = Application.nativeApplicationVersion
      } catch {
        // Webの場合はrequire('expo-application')で例外が発生するため、catchして処理を行う
        appVersion = APP_VERSION
      }

      // アプリバージョンをヘッダに追加
      // Backend側でこのアプリバージョンをもとに最小バージョンを満たしているかをチェックする
      if (appVersion) {
        headers.set('app-version', appVersion)
      }

      return headers
    },
    paramsSerializer: (params) => {
      // 配列をパラメータとして渡せるようにする(添え字なしの繰り返し方式)
      //   例）tasks?limit=10&sort=priority.name.asc&sort=id.asc
      return qs.stringify(params, {
        arrayFormat: 'repeat',
      })
    },
  }),
  // NOTE: エンドポイントは各ドメインのapis内で定義
  endpoints: () => ({}),
})

// 共通API用
const customBaseQueryForCommonApis = (
  baseArgs: FetchBaseQueryArgs
): ReturnType<typeof fetchBaseQuery> => {
  return async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: commonAppApiBaseUrl() + 'api/v1/',
      ...baseArgs,
    })

    if (isFetchArgs(args)) {
      if (args.body) {
        // backEndのomitemptyのためにbodyの""はnullに変換する
        args.body = convertEmptyValuesToNull(args.body)
      }
    }

    let result = await baseQuery(args, api, extraOptions)

    // 共通APIは現状リフレッシュトークンは使わないため、リトライ処理は行わない

    // 最終的にこのrequestに成功したらリクエスト成功イベントコールバックを実行する
    if (!result.error) {
      eventCallback.success.forEach((f) => f())
    }
    return result
  }
}

export const commonApis = createApi({
  reducerPath: 'commonApis',
  // キャッシュの状態に関わらず再マウント時や引数が変わった場合はrefetchさせるため、refetchOnMountOrArgChangeをtrueにする
  // https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#encouraging-re-fetching-with-refetchonmountorargchange
  refetchOnMountOrArgChange: true,
  baseQuery: customBaseQueryForCommonApis({
    credentials: 'include',
    prepareHeaders: (headers) => {
      // タイムゾーンをヘッダに追加
      const timezone =
        timezoneGetter?.() || // 設定されたタイムゾーン取得関数を使う
        dayjs.tz.guess() // ↑が未設定だった場合、環境から取得したタイムゾーンを使う
      headers.set('TZ', timezone)

      return headers
    },
    paramsSerializer: (params) => {
      // 配列をパラメータとして渡せるようにする(添え字なしの繰り返し方式)
      //   例）tasks?limit=10&sort=priority.name.asc&sort=id.asc
      return qs.stringify(params, {
        arrayFormat: 'repeat',
      })
    },
  }),
  // NOTE: エンドポイントは各ドメインのapis内で定義
  endpoints: () => ({}),
})

// -----------------------------------------------------------------------------

/**
 * ベースクエリにイベントハンドラをセットする
 * @param event
 * @param fn
 */
export const setEventHandler = (event: Event, fn: EventHandler) => {
  eventCallback[event].add(fn)
}

/**
 * ベースクエリのイベントハンドラを除去する
 * @param event
 * @param fn
 */
export const deleteEventHandler = (event: Event, fn: EventHandler) => {
  eventCallback[event].delete(fn)
}

/**
 * タイムゾーンを取得する関数をセットする
 * @param fn
 */
export const setTimezoneGetter = (fn: () => string) => {
  timezoneGetter = fn
}

/**
 * アクセストークンのリフレッシュを行う
 * @returns
 */
export const refreshAccessToken = async () => {
  const refreshTokenUrl = apiBaseUrl() + 'api/v1/refresh'

  const result = await fetch(refreshTokenUrl, {
    method: 'GET',
    credentials: 'include',
  })
  if (result.ok) {
    // リフレッシュ成功

    // リフレッシュ成功時にもリクエスト成功イベントコールバックは実行する
    eventCallback.success.forEach((f) => f())
    return true
  } else {
    // リフレッシュ失敗、イベントコールバックを実行する。
    // コールバック側でログアウト処理や画面遷移等を実行する
    eventCallback.refresh_failed.forEach((f) => f())
    return false
  }
}
