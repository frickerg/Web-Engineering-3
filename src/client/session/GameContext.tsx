import React, { createContext, useReducer, ReactNode, useMemo } from 'react'
import { Action, initialState, reducer, State } from './gameReducer'

type ContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const GameContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
})

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
