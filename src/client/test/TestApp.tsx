import { ReactNode, useEffect, useReducer, useMemo } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { GameContext } from '../session/GameContext'
import { CardProps } from '../../shared/CardProps'
import {
  initialState as gameInitialState,
  reducer as gameReducer,
} from '../session/gameReducer'
import {
  initialState as authInitialState,
  reducer as authReducer,
} from '../session/authReducer'
import { AuthenticatedUser } from '../api/AuthenticatedUser'
import { AuthContext } from '../session/AuthContext'
import { login } from '../api'

type Props = {
  cards?: CardProps[]
  user?: AuthenticatedUser | null
  children?: ReactNode
}

export const TestApp = ({ children, cards, user }: Props) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, {
    ...gameInitialState,
    storeCards: cards || [],
  })

  const [authState, authDispatch] = useReducer(authReducer, {
    ...authInitialState(),
    user: user || null,
  })

  useEffect(() => {
    if (cards) {
      gameDispatch({ type: 'SET_CARDS', payload: cards })
    }
  }, [cards, gameDispatch])

  const loginUser = async (
    username: string,
    password: string
  ): Promise<AuthenticatedUser> => {
    return await login(username, password)
      .then(data => {
        authDispatch({ type: 'LOGIN_SUCCESS', payload: data })
        return data
      })
      .catch(error => {
        authDispatch({
          type: 'LOGIN_FAILURE',
          payload: `Login failed. Please try again. ${error}`,
        })

        throw new Error('Login failed')
      })
  }

  const logoutUser = () => {
    authDispatch({ type: 'LOGOUT' })
  }

  const gameContextValue = useMemo(
    () => ({ state: gameState, dispatch: gameDispatch }),
    [gameState, gameDispatch]
  )

  const authContextValue = useMemo(() => {
    return {
      state: authState,
      dispatch: authDispatch,
      loginUser,
      logoutUser,
    }
  }, [authState, authDispatch])

  return (
    <AuthContext.Provider value={authContextValue}>
      <GameContext.Provider value={gameContextValue}>
        <MemoryRouter>{children}</MemoryRouter>
      </GameContext.Provider>
    </AuthContext.Provider>
  )
}
