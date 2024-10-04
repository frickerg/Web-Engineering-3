import { AuthenticatedUser } from '../api/AuthenticatedUser'
import { loadAuthFromLocalStorage } from './authStorage'

export type State = {
  user: AuthenticatedUser | null
  error?: string
}

export type Action =
  | { type: 'LOGIN_SUCCESS'; payload: AuthenticatedUser }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }

const { token, username, role } = loadAuthFromLocalStorage()
// TODO get, oder nicht mehr funktion
export const initialState = (): State => {
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

export const reducer = (state: State, action: Action): State => {
  console.log('AuthReducer', action)
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
