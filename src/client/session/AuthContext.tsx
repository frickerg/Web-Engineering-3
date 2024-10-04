import React, {
  createContext,
  ReactNode,
  useReducer,
  useCallback,
  useMemo,
} from 'react'
import { AuthenticatedUser } from '../api/AuthenticatedUser'
import {
  removeAuthFromLocalStorage,
  saveAuthToLocalStorage,
} from './authStorage'
import { login } from '../api'
import { Action, initialState, reducer, State } from './authReducer'

type ContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
  loginUser: (username: string, password: string) => Promise<AuthenticatedUser>
  logoutUser: () => void
}

export const AuthContext = createContext<ContextProps>({
  state: initialState(),
  dispatch: () => null,
  loginUser: async () => ({} as AuthenticatedUser),
  logoutUser: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState())

  const loginUser = useCallback(
    async (username: string, password: string): Promise<AuthenticatedUser> => {
      return await login(username, password)
        .then(data => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data,
          })

          saveAuthToLocalStorage(data.token, data.username, data.role)
          return data
        })
        .catch(error => {
          dispatch({
            type: 'LOGIN_FAILURE',
            payload: `Login failed. Please try again. ${error}`,
          })
          return {} as AuthenticatedUser
        })
    },
    [dispatch]
  )

  const logoutUser = useCallback(() => {
    removeAuthFromLocalStorage()
    dispatch({ type: 'LOGOUT' })
  }, [dispatch])

  const contextValue = useMemo(
    () => ({ state, dispatch, loginUser, logoutUser }),
    [state, dispatch, loginUser, logoutUser]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
