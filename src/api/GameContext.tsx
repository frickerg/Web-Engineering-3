import React, { createContext, useReducer, ReactNode, useCallback } from 'react'
import { CardProps } from '../client/components/elements/Card/Card'
import { useNavigate } from 'react-router-dom'
import { GameState } from './GameState'

export interface GameResultItem extends CardProps {
  answer: string
  isAccepted: boolean
}

type State = {
  cards: GameResultItem[]
  gameState: GameState
  buttonLabel: string
  currentCardIndex: number
}

type InitGameAction = {
  type: 'INIT_GAME'
  payload: GameResultItem[]
}

type SetCardIndexAction = {
  type: 'SET_CARD_INDEX'
  payload: number
}

type DeleteGameAction = {
  type: 'DELETE_GAME'
}

type FinishGameAction = {
  type: 'FINISH_GAME'
}

type Action =
  | InitGameAction
  | SetCardIndexAction
  | DeleteGameAction
  | FinishGameAction

type Props = {
  state: State
  dispatch: React.Dispatch<Action>
  handleButtonClick: () => void
}

const initialState: State = {
  cards: [],
  gameState: GameState.NOT_STARTED,
  buttonLabel: 'New Game',
  currentCardIndex: 0,
}

const gameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INIT_GAME': {
      return {
        ...state,
        cards: action.payload,
        gameState: GameState.ONGOING,
        currentCardIndex: 0,
        buttonLabel: 'Solve #1',
      }
    }
    case 'SET_CARD_INDEX': {
      const newLabel =
        state.gameState === GameState.ONGOING && state.cards.length > 0
          ? 'Solve #' + (action.payload + 1)
          : state.gameState === GameState.FINISHED
          ? 'Finished'
          : 'New Game'
      return {
        ...state,
        currentCardIndex: action.payload,
        buttonLabel: newLabel,
      }
    }
    case 'DELETE_GAME':
      return {
        ...state,
        cards: [],
        gameState: GameState.NOT_STARTED,
        currentCardIndex: 0,
        buttonLabel: 'New Game',
      }
    case 'FINISH_GAME':
      return {
        ...state,
        gameState: GameState.FINISHED,
        buttonLabel: 'Finished',
      }
    default:
      return state
  }
}

export const GameContext = createContext<Props>({
  state: initialState,
  dispatch: () => null,
  handleButtonClick: () => {},
})

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const navigate = useNavigate()

  const handleButtonClick = useCallback(() => {
    dispatch({ type: 'SET_CARD_INDEX', payload: state.currentCardIndex })
    navigate('/')
  }, [navigate, state.currentCardIndex])

  const contextValue = { state, dispatch, handleButtonClick }

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
