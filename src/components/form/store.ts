import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit'

// 各apiのsliceのimport
import { apis, commonApis } from 'apis/apis'
import { appSlice } from 'features/app/states/appSlice'
import { projectListPageSlice } from 'features/project/components/projectListPage/states/projectListPageSlice'
import { projectDetailSlice } from 'features/project/components/projectDetailPage/states/projectDetailSlice'
import { eventDetailPageSlice } from 'features/project/components/eventDetailPage/states/eventDetailPageSlice'
import { taskDetailSlice } from 'features/task/components/taskDetailPage/states/taskDetailSlice'
import { homeSlice } from 'features/home/states/homeSlice'
import { directChannelEntryDialogSlice } from 'features/chat/components/directChannelEntryDialog/states/directChannelEntryDialogSlice'
import { webMeetingSlice } from 'features/webMeeting/states/webMeetingSlice'
import { tenantSettingPageSlice } from 'features/tenant/components/tenantSettingPage/state/tenantSettingPageSlice'
import {
  messageSlice,
  userSettingSlice,
  presenceStatesSlice,
} from '@crew/states'
import { myTaskSlice } from 'features/home/components/myTaskPage/states/myTaskSlice'
import { searchPageSlice } from 'features/search/components/searchPage/states/searchPageSlice'
import { ACTION_RESET_STATE } from 'configs/constants'
import { fileListSlice } from 'features/file/components/fileListPage/states/fileListSlice'

// 各sliceのreducerを結合
const appReducers = combineReducers({
  [apis.reducerPath]: apis.reducer,
  [commonApis.reducerPath]: commonApis.reducer,
  [appSlice.name]: appSlice.reducer,
  [projectListPageSlice.name]: projectListPageSlice.reducer,
  [projectDetailSlice.name]: projectDetailSlice.reducer,
  [fileListSlice.name]: fileListSlice.reducer,
  [eventDetailPageSlice.name]: eventDetailPageSlice.reducer,
  [taskDetailSlice.name]: taskDetailSlice.reducer,
  [homeSlice.name]: homeSlice.reducer,
  [directChannelEntryDialogSlice.name]: directChannelEntryDialogSlice.reducer,
  [myTaskSlice.name]: myTaskSlice.reducer,
  [webMeetingSlice.name]: webMeetingSlice.reducer,
  [tenantSettingPageSlice.name]: tenantSettingPageSlice.reducer,
  [messageSlice.name]: messageSlice.reducer,
  [userSettingSlice.name]: userSettingSlice.reducer,
  [searchPageSlice.name]: searchPageSlice.reducer,
  [presenceStatesSlice.name]: presenceStatesSlice.reducer,
})

const rootReducer: typeof appReducers = (state, action) => {
  // Reduxのstate初期化用のアクションの場合はstateを初期化
  if (action.type === ACTION_RESET_STATE) {
    state = undefined
  }
  return appReducers(state, action)
}

// rtkquery部分 https://redux-toolkit.js.org/rtk-query/overview#configure-the-store
// その他sliceの部分
// https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.middleware, commonApis.middleware),
})

// Reduxのstateをすべて初期化する
export const resetReduxState = () => {
  store.dispatch({ type: ACTION_RESET_STATE })
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
