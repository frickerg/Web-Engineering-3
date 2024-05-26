/**
 * TODO Eventuelle Verbesserung
 * Man könnte auch nur die ID und answer übergeben. Über ID würde man die Karte fetchen
 * und die Antwort würde man dynamisch Vergleichen. Setzt voraus, dass man weiss, welche Seite abgefragt wurde :)
 */

import React, { createContext, useReducer, ReactNode, useMemo } from 'react'
import { CardProps } from '../client/components/elements/Card/Card'

export interface GameResultItem extends CardProps {
  answer: string
  accepted: boolean
}

type State = {
  cards: GameResultItem[]
}

type SetCardsAction = {
  type: 'SET_CARDS'
  payload: GameResultItem[]
}

type DeleteGameAction = {
  type: 'DELETE_GAME'
}

type Action = SetCardsAction | DeleteGameAction

type Props = {
  state: State
  dispatch: React.Dispatch<Action>
}

const initialState: State = {
  cards: [],
}

const gameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: action.payload }
    case 'DELETE_GAME':
      return { cards: [] }
    default:
      return state
  }
}

export const GameContext = createContext<Props>({
  state: initialState,
  dispatch: () => null,
})

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  /* TODO You might have to use something other than useMemo here
   * sonarlint(typescript:S6481)
   * The object passed as the value prop to the Context provider changes every render.
   * To fix this consider wrapping it in a useMemo hook.
   * (property) dispatch: React.Dispatch<Action>
   */
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
