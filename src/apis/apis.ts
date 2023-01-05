import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  FetchArgs,
  FetchBaseQueryArgs,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { API_BASE_URL } from 'configs/constants'
import { Mutex } from 'async-mutex'
import { setLoggedOutUser } from 'features/app/states/appSlice'

const isFetchArgs = (v: any): v is FetchArgs => 'url' in v
const mutex = new Mutex()

const customBaseQuery = (
  args: FetchBaseQueryArgs
): ReturnType<typeof fetchBaseQuery> => {
  const baseQuery = fetchBaseQuery(args)

  return async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    // ↑のリクエストが認証エラーでレスポンスが401だった場合にリトライ
    if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()

        try {
          const refreshResult = await baseQuery('/refresh', api, extraOptions)
          if (!refreshResult.error) {
            // リフレッシュを掛けた上で最初のクエリを実行する
            result = await baseQuery(args, api, extraOptions)
          } else {
            // If the refresh token expired, redirect to login page
            api.dispatch(setLoggedOutUser())
          }
        } finally {
          release()
        }
      } else {
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }
    }
    return result
  }
}

// RTKQueryのベース設定
export const apis = createApi({
  reducerPath: 'apis',
  baseQuery: customBaseQuery({
    baseUrl: API_BASE_URL + 'api/v1/',
    credentials: 'include',
    prepareHeaders: (headers) => {
      return headers
    },
  }),
  // NOTE: エンドポイントは各ドメインのapis内で定義
  endpoints: () => ({}),
})
