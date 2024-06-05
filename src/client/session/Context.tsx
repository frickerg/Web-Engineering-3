import React, { createContext, useReducer, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardProps, InputType, SortDirection } from '../../model/Card'
import { GameState } from '../../model/Game'
import { retrieveLabel } from './helper'

export interface GameResultItem extends CardProps {
  answer?: string
  isAccepted?: boolean
}

type State = {
  gameCards: GameResultItem[]
  storeCards: CardProps[]
  sortType: InputType
  sortDirection: SortDirection
  cardInput: { front: string; back: string }
  filterChecked: boolean
  gameState: GameState
  buttonLabel: string
  currentCardIndex: number
}

export type Action =
  | { type: 'INIT_GAME'; payload: GameResultItem[] }
  | { type: 'SET_CARD_INDEX'; payload: number }
  | { type: 'FINISH_GAME' }
  | { type: 'DELETE_GAME' }
  | { type: 'SET_CARDS'; payload: GameResultItem[] }
  | { type: 'ADD_CARD'; payload: CardProps }
  | { type: 'DELETE_CARD'; payload: string }
  | { type: 'SET_SORT_TYPE'; payload: InputType }
  | { type: 'SET_SORT_DIRECTION'; payload: SortDirection }
  | { type: 'SET_CARD_INPUT'; payload: { front: string; back: string } }
  | { type: 'SET_FILTER_CHECKED'; payload: boolean }

type ContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
  handleButtonClick: () => void
}

const initialState: State = {
  gameCards: [],
  storeCards: [],
  gameState: GameState.NOT_STARTED,
  buttonLabel: retrieveLabel(GameState.NOT_STARTED),
  currentCardIndex: 0,
  sortType: 'front',
  sortDirection: 'asc',
  cardInput: { front: '', back: '' },
  filterChecked: false,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INIT_GAME': {
      return {
        ...state,
        gameCards: action.payload,
        gameState: GameState.ONGOING,
        currentCardIndex: 0,
        buttonLabel: retrieveLabel(GameState.ONGOING),
      }
    }
    case 'SET_CARD_INDEX': {
      return {
        ...state,
        currentCardIndex: action.payload,
        buttonLabel: retrieveLabel(state.gameState, action.payload),
      }
    }
    case 'DELETE_GAME':
      return {
        ...state,
        gameCards: [],
        gameState: GameState.NOT_STARTED,
        currentCardIndex: 0,
        buttonLabel: retrieveLabel(GameState.NOT_STARTED),
      }
    case 'FINISH_GAME':
      return {
        ...state,
        gameState: GameState.FINISHED,
        buttonLabel: retrieveLabel(GameState.FINISHED),
      }
    case 'SET_CARDS':
      return { ...state, storeCards: action.payload }
    case 'ADD_CARD':
      return { ...state, storeCards: [...state.storeCards, action.payload] }
    case 'DELETE_CARD':
      return {
        ...state,
        storeCards: state.storeCards.filter(card => card.id !== action.payload),
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

export const GameContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
  handleButtonClick: () => {},
})

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()

  const handleButtonClick = () => {
    dispatch({ type: 'SET_CARD_INDEX', payload: state.currentCardIndex })
    navigate('/')
  }

  const contextValue = { state, dispatch, handleButtonClick }
  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
