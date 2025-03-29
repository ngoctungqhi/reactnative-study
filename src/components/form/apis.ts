import {
  apis,
  commonApis,
  Event,
  EventHandler,
  setEventHandler,
} from '@crew/apis/apiBase'

import { store } from 'states/store'

import { setLoggedOutUser } from 'features/app/states/appSlice'

const handleRefreshFailed: EventHandler = () => {
  store.dispatch(setLoggedOutUser())
}

/**
 * バージョンが古く更新が必要なときに呼ぶイベントハンドラ
 */
const handleUpgradeRequired: EventHandler = () => {
  // リロード実行
  // ⇒index.htmlがキャッシュ無効化されているため、リロードすると新しいindex.htmlが読み込まれる(=javascriptも最新バージョンが読み込まれる)
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

setEventHandler(Event.RefreshFailed, handleRefreshFailed)
setEventHandler(Event.UpgradeRequired, handleUpgradeRequired)

export { apis, commonApis }
