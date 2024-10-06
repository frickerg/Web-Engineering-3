import { CardProps } from '../../shared/CardProps'
import { GameResultItem, InputType, SortDirection } from '../common/types'
import { GameState, retrieveLabel } from './helper'

export type State = {
  gameCards: GameResultItem[]
  storeCards: CardProps[]
  results: GameResultItem[]
  gameSize: number
  sortType: InputType
  sortDirection: SortDirection
  cardInput: { front: string; back: string }
  filterChecked: boolean
  gameState: GameState
  buttonLabel: string
  currentCardIndex: number
  progress: number
}

export type Action =
  | {
      type: 'INIT_GAME'
      payload: { gameCards: GameResultItem[]; gameSize: number }
    }
  | { type: 'SUBMIT_GAME_ANSWER'; payload: GameResultItem }
  | { type: 'ADD_NEW_CARD'; payload: GameResultItem }
  | { type: 'SET_CARD_INDEX'; payload: number }
  | { type: 'FINISH_GAME' }
  | { type: 'DELETE_GAME' }
  | { type: 'SET_CARDS'; payload: CardProps[] }
  | { type: 'ADD_CARD'; payload: CardProps }
  | { type: 'DELETE_CARD'; payload: string }
  | { type: 'SET_SORT_TYPE'; payload: InputType }
  | { type: 'SET_SORT_DIRECTION'; payload: SortDirection }
  | { type: 'SET_GAME_RESULTS'; payload: GameResultItem[] }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'SET_CARD_INPUT'; payload: { front: string; back: string } }
  | { type: 'SET_FILTER_CHECKED'; payload: boolean }

export const initialState: State = {
  gameCards: [],
  storeCards: [],
  results: [],
  gameSize: 0,
  gameState: GameState.NOT_STARTED,
  buttonLabel: retrieveLabel(GameState.NOT_STARTED),
  currentCardIndex: 0,
  sortType: 'front',
  sortDirection: 'asc',
  cardInput: { front: '', back: '' },
  filterChecked: false,
  progress: 0,
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INIT_GAME': {
      return {
        ...state,
        gameCards: action.payload.gameCards,
        gameSize: action.payload.gameSize,
        gameState: GameState.ONGOING,
        currentCardIndex: 0,
        buttonLabel: retrieveLabel(GameState.ONGOING),
        progress: 0,
      }
    }
    case 'SUBMIT_GAME_ANSWER': {
      const updatedGameCards = [...state.gameCards]
      updatedGameCards[state.currentCardIndex] = action.payload
      return {
        ...state,
        gameCards: updatedGameCards,
      }
    }
    case 'ADD_NEW_CARD': {
      return {
        ...state,
        gameCards: [...state.gameCards, action.payload],
      }
    }
    case 'SET_CARD_INDEX': {
      return {
        ...state,
        currentCardIndex: action.payload,
        buttonLabel: retrieveLabel(state.gameState, action.payload),
      }
    }
    case 'SET_PROGRESS': {
      return {
        ...state,
        progress: action.payload,
      }
    }
    case 'SET_GAME_RESULTS': {
      return {
        ...state,
        results: action.payload,
      }
    }
    case 'DELETE_GAME': {
      return {
        ...state,
        gameCards: [],
        gameState: GameState.NOT_STARTED,
        currentCardIndex: 0,
        buttonLabel: retrieveLabel(GameState.NOT_STARTED),
      }
    }
    case 'FINISH_GAME': {
      return {
        ...state,
        gameState: GameState.FINISHED,
        buttonLabel: retrieveLabel(GameState.FINISHED),
      }
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
