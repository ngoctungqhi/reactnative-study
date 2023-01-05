export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_TOTAL_COUNT = 0
export const DEFAULT_PAGE_ACTIVITY_SIZE = 5
export const DEFAULT_PAGE_ACTIVITY_INDEX = 1
export const LIMIT_INITIAL_RECORD = 3
export const ALL_ACTIVITIES = 'allActivities'

export const ALL_PROJECT_ACTIVITY_TYPES = 'allTypes'

export const ROWS_PER_PAGE_OPTIONS = [10, 50, 100]

export const HTML_EDITOR_FONT_SIZES = [
  '8pt',
  '10pt',
  '12pt',
  '14pt',
  '18pt',
  '24pt',
  '36pt',
]

// インクリメンタルサーチと即時検索のディレイ
export const SEARCH_TIMEOUT_MSEC = 500
export const LOAD_DATA_GRID_TIMEOUT = 50

export const ALL_PROJECT_TASK_TYPES = 'allTypes'

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? 'http://192.168.100.42:1323/'

export const DEFAULT_PAGING_PARAMS = {
  pageIndex: 0,
  pageSize: DEFAULT_PAGE_SIZE,
}

// タスク優先度のアイコン
// db内データのpriority_orderと対応
// TODO: https://break-tmc.atlassian.net/browse/CREW-3115?atlOrigin=eyJpIjoiNDgxYmNjZDhkZmMzNGU5M2E2MmFjZmMxZGY0ZWNhYjciLCJwIjoiaiJ9 の議論の結果でここの持ち方も変更する
export const TASK_PRIORITY_ICONS = [
  'bi bi-chevron-double-up text-crew-red-3-light dark:text-crew-red-3-dark',
  'bi bi-chevron-up text-crew-red-3-light dark:text-crew-red-3-dark',
  'bi bi-dash text-crew-green-3-light dark:text-crew-green-3-dark',
  'bi bi-chevron-down text-crew-blue-3-light dark:text-crew-blue-3-dark',
  'bi bi-chevron-double-down text-crew-blue-3-light dark:text-crew-blue-3-dark',
]

// 1week = 5days, 1day = 8hours, 1hour = 60minutes
// 1week = 5*8*60 minutes
// 1day = 8*60 minutes
// 1hours = 60 minutes
export const MINUTES_PER_WEEK = 2400
export const MINUTES_PER_DAY = 480
export const MINUTES_PER_HOUR = 60

// フィード・チャットの同時に取得するメッセージ件数の最小値。実際の値はwindowリサイズで拡張する
export const MESSAGE_FETCH_MIN_LIMIT = 10

// フィード・メッセージ表示時の最小縦幅。messageFetchLimitの計算でのみ使用する
export const MESSAGE_AREA_MIN_HEIGHT = 40 //px

// HTMLエディタで入力された内容を表示する際に使用するcss
export const HTMLEDITOR_VIEW_STYLE = 'list table break-all'

export const MAXIMUM_CHAT_PANEL = 0.5
