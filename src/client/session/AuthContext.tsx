import React, {
  createContext,
  ReactNode,
  useReducer,
  useCallback,
  useMemo,
} from 'react'
import { UserRole } from '../../shared/UserRole'
import { loginUserService, logoutUserService } from '../api/authService'
import { LoginResponse } from '../api/LoginResponse'

type State = {
  user: { username: string; role: UserRole }
  error?: string
}

export type Action =
  | { type: 'LOGIN_SUCCESS'; payload: LoginResponse }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }

type ContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
  loginUser: (username: string, password: string) => Promise<LoginResponse>
  logoutUser: () => void
}

const initialState: State = {
  user: { username: '', role: undefined },
  error: undefined,
}

const reducer = (state: State, action: Action): State => {
  console.log('reducer', action)
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      const { username, role, token } = action.payload
      localStorage.setItem('token', token)
      return {
        ...state,
        user: { username, role },
        error: '',
      }
    }
    case 'LOGIN_FAILURE': {
      return {
        ...state,
        error: action.payload,
      }
    }
    case 'LOGOUT': {
      localStorage.removeItem('token')
      return {
        ...state,
        user: { username: '', role: undefined },
      }
    }
    default:
      return state
  }
}

export const AuthContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
  loginUser: async () => ({} as LoginResponse),
  logoutUser: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const loginUser = useCallback(
    async (username: string, password: string): Promise<LoginResponse> => {
      return await loginUserService(username, password)
        .then(data => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data,
          })
          return data
        })
        .catch(error => {
          dispatch({
            type: 'LOGIN_FAILURE',
            payload: `Login failed. Please try again. ${error}`,
          })
          return {} as LoginResponse
        })
    },
    [dispatch]
  )

  const logoutUser = useCallback(() => {
    logoutUserService()
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
