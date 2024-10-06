import { ReactNode, useEffect, useReducer, useMemo } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../session/AuthContext'
import { GameContext } from '../session/GameContext'
import { CardProps } from '../../shared/CardProps'
import { initialState, reducer } from '../session/gameReducer'
import { GameResultItem } from '../common/types'

type Props = {
  cards?: CardProps[]
  game?: { gameCards: GameResultItem[]; gameSize: number }
  children?: ReactNode
}

export const TestApp = ({ children, cards, game }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    storeCards: cards || [],
    gameCards: game?.gameCards || [],
    gameSize: game?.gameSize ?? 0,
  })

  useEffect(() => {
    if (cards) {
      dispatch({ type: 'SET_CARDS', payload: cards })
    }
  }, [cards, dispatch])

  useEffect(() => {
    if (game) {
      dispatch({ type: 'INIT_GAME', payload: game })
    }
  }, [game, dispatch])

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <AuthProvider>
      <GameContext.Provider value={contextValue}>
        <MemoryRouter>{children}</MemoryRouter>
      </GameContext.Provider>
    </AuthProvider>
  )
}
