import { ReactNode, useEffect, useReducer, useMemo } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../session/AuthContext'
import { GameContext } from '../session/GameContext'
import { CardProps } from '../../shared/CardProps'
import { initialState, reducer } from '../session/gameReducer'

type Props = {
  cards?: CardProps[]
  children?: ReactNode
}

export const TestApp = ({ children, cards }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    storeCards: cards || [],
    gameCards: cards || [],
  })

  useEffect(() => {
    if (cards) {
      dispatch({ type: 'SET_CARDS', payload: cards })
    }
  }, [cards, dispatch])

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <AuthProvider>
      <GameContext.Provider value={contextValue}>
        <MemoryRouter>{children}</MemoryRouter>
      </GameContext.Provider>
    </AuthProvider>
  )
}
