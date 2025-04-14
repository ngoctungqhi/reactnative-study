import { LocalStorageKeys } from 'enums/system'
import { useCallback } from 'react'

import { resetReduxState } from 'states/store'

export const useLogoutFrontend = () => {
  const logout = useCallback(() => {
    // Remove logged in user information from local storage
    localStorage.removeItem(LocalStorageKeys.LoggedInUser)
    resetReduxState()
  }, [])

  return logout
}
