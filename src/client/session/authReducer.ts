import { AuthenticatedUser } from '../api/AuthenticatedUser'
import { getAuthFromLocalStorage } from './authStorage'

export type State = {
  user: AuthenticatedUser | null
  error?: string
}

export type Action =
  | { type: 'LOGIN_SUCCESS'; payload: AuthenticatedUser }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }

const { token, username, role } = getAuthFromLocalStorage()
const user = token && username && role ? { token, username, role } : null

export const initialState: State = {
  user,
  error: undefined,
}

export const reducer = (state: State, action: Action): State => {
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
      return {
        ...state,
        user: null,
        error: undefined,
      }
    }
    default:
      return state
  }
}
