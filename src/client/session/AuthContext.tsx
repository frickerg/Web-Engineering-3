import React, {
  createContext,
  ReactNode,
  useReducer,
  useCallback,
  useMemo,
} from 'react'
import { AuthenticatedUser } from '../api/AuthenticatedUser'
import {
  loadAuthFromLocalStorage,
  removeAuthFromLocalStorage,
  saveAuthToLocalStorage,
} from './authStorage'
import { login } from '../api'

export type State = {
  user: AuthenticatedUser | null
  error?: string
}

export type Action =
  | { type: 'LOGIN_SUCCESS'; payload: AuthenticatedUser }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }

type ContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
  loginUser: (username: string, password: string) => Promise<AuthenticatedUser>
  logoutUser: () => void
}

const initialState = (): State => {
  const { token, username, role } = loadAuthFromLocalStorage()

  if (token && username && role) {
    return {
      user: { username, role, token },
      error: undefined,
    }
  }

  return {
    user: null,
    error: undefined,
  }
}

const reducer = (state: State, action: Action): State => {
  console.log('reducer', action)
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        user: action.payload,
        error: undefined,
      }
    }
    case 'LOGIN_FAILURE': {
      return {
        ...state,
        error: action.payload,
      }
    }
    case 'LOGOUT': {
      return initialState()
    }
    default:
      return state
  }
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
