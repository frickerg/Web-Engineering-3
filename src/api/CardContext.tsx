import React, { createContext, useReducer, ReactNode, useMemo } from 'react'
import { CardProps } from '../client/components/elements/Card/Card'

type State = {
  cards: CardProps[]
}

type SetCardsAction = {
  type: 'SET_CARDS'
  payload: CardProps[]
}

type AddCardAction = {
  type: 'ADD_CARD'
  payload: CardProps
}

type DeleteCardAction = {
  type: 'DELETE_CARD'
  payload: string
}

type Action = SetCardsAction | AddCardAction | DeleteCardAction

type CardContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
}

const initialState: State = {
  cards: [],
}

const cardReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: action.payload }
    case 'ADD_CARD':
      return { ...state, cards: [...state.cards, action.payload] }
    case 'DELETE_CARD':
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload),
      }
    default:
      return state
  }
}

export const CardContext = createContext<CardContextProps>({
  state: initialState,
  dispatch: () => null,
})

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  )
}
