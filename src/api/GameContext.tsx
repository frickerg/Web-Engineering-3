import React, { createContext, useReducer, ReactNode, useMemo } from 'react'
import { CardProps } from '../client/components/elements/Card/Card'

type State = {
  cards: CardProps[]
}

type XxxAction1 = {
  type: 'XXX1'
  payload: CardProps[]
}

type XxxAction2 = {
  type: 'XXX2'
  payload: CardProps[]
}

type Action = XxxAction1 | XxxAction2

type Props = {
  state: State
  dispatch: React.Dispatch<Action>
}

const initialState: State = {
  cards: [],
}

const gameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'XXX1':
      return { ...state, cards: action.payload }
    case 'XXX2':
      return { ...state, cards: action.payload }
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
