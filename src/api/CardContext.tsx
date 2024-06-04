import React, { createContext, useReducer, ReactNode } from 'react'
import { CardProps } from '../client/components/elements/Card/Card'

export type InputType = 'front' | 'back'
export type SortDirection = 'asc' | 'desc'

type State = {
  cards: CardProps[]
  sortType: InputType
  sortDirection: SortDirection
  cardInput: { front: string; back: string }
  filterChecked: boolean
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

type SetSortTypeAction = {
  type: 'SET_SORT_TYPE'
  payload: InputType
}

type SetSortDirectionAction = {
  type: 'SET_SORT_DIRECTION'
  payload: SortDirection
}

type SetCardInputAction = {
  type: 'SET_CARD_INPUT'
  payload: { front: string; back: string }
}

type SetFilterCheckedAction = {
  type: 'SET_FILTER_CHECKED'
  payload: boolean
}

type Action =
  | SetCardsAction
  | AddCardAction
  | DeleteCardAction
  | SetSortTypeAction
  | SetSortDirectionAction
  | SetCardInputAction
  | SetFilterCheckedAction

type CardContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
}

const initialState: State = {
  cards: [],
  sortType: 'front',
  sortDirection: 'asc',
  cardInput: { front: '', back: '' },
  filterChecked: false,
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
    case 'SET_SORT_TYPE':
      return { ...state, sortType: action.payload }
    case 'SET_SORT_DIRECTION':
      return { ...state, sortDirection: action.payload }
    case 'SET_CARD_INPUT':
      return { ...state, cardInput: action.payload }
    case 'SET_FILTER_CHECKED':
      return { ...state, filterChecked: action.payload }
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
  const contextValue = { state, dispatch }

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  )
}
