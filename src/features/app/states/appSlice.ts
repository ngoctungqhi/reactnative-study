import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'states/store'
import { User } from 'features/app/apis/models/login/response'
import { AppLanguage } from 'enums/app'

type AppStateType = {
  loggedInUser?: User | null
  currentLanguage: AppLanguage
}

const initialAppState: AppStateType = {
  loggedInUser: null,
  currentLanguage: AppLanguage.Ja,
}

/**
 * スライス
 */
export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<User>) => {
      state.loggedInUser = action.payload
    },
    setLoggedOutUser: (state) => {
      state.loggedInUser = null
    },
    // 言語切り替え
    changeLanguage: (state, action: PayloadAction<AppLanguage>) => {
      state.currentLanguage = action.payload
    },
  },
})

/**
 * アクション
 */
export const { setLoggedInUser, setLoggedOutUser, changeLanguage } =
  appSlice.actions

/**
 * appSliceセレクタ
 */
export const appSliceSelector = (state: RootState) => state.app
