import { AuthenticatedUser } from '../api/AuthenticatedUser'

export type State = {
  user: AuthenticatedUser | null
  error?: string
}

export type Action =
  | { type: 'LOGIN_SUCCESS'; payload: AuthenticatedUser }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }

export const initialState: State = {
  user: null,
  error: undefined,
}

export const reducer = (state: State, action: Action): State => {
  console.log('AuthReducer', action, state)
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
      return initialState
    }
    default:
      return state
  }
}
