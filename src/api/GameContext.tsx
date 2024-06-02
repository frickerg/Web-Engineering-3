import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback,
} from 'react'
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

type StartGameAction = {
  type: 'START_GAME'
  payload: GameResultItem[]
}

type SetCardIndexAction = {
  type: 'SET_CARD_INDEX'
  payload: number
}

type SetCardsAction = {
  type: 'SET_CARDS'
  payload: GameResultItem[]
}

type DeleteGameAction = {
  type: 'DELETE_GAME'
}

type FinishGameAction = {
  type: 'FINISH_GAME'
}

type UpdateButtonAction = {
  type: 'UPDATE_BUTTON'
}

type Action =
  | StartGameAction
  | SetCardIndexAction
  | SetCardsAction
  | DeleteGameAction
  | FinishGameAction
  | UpdateButtonAction

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

function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomEntries<T>(array: T[], numberOfEntries: number): T[] {
  if (numberOfEntries > array.length) {
    return []
  }

  const result = new Set<T>()
  while (result.size < numberOfEntries) {
    const randomIndex = Math.floor(Math.random() * array.length)
    result.add(array[randomIndex])
  }

  return Array.from(result)
}

const gameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'START_GAME': {
      const cards = action.payload
      const maxIndex = cards.length > 10 ? 10 : cards.length
      const numberOfEntries = randomNumberBetween(3, maxIndex)
      const randomGameCards = getRandomEntries(cards, numberOfEntries)

      return {
        ...state,
        cards: randomGameCards,
        gameState: GameState.START,
        currentCardIndex: 0,
      }
    }
    case 'SET_CARD_INDEX':
      return { ...state, currentCardIndex: action.payload }
    case 'SET_CARDS': {
      return {
        ...state,
        cards: action.payload,
        gameState: GameState.ONGOING,
        currentCardIndex: 0,
      }
    }
    case 'DELETE_GAME':
      return {
        ...state,
        cards: [],
        gameState: GameState.NOT_STARTED,
        currentCardIndex: 0,
      }
    case 'FINISH_GAME':
      return { ...state, gameState: GameState.FINISHED }
    case 'UPDATE_BUTTON': {
      let label
      if (state.gameState === GameState.ONGOING && state.cards.length > 0) {
        label = 'Solve #' + (state.currentCardIndex + 1)
      } else if (state.gameState === GameState.FINISHED) {
        label = 'Finished'
      } else {
        label = 'New Game'
      }
      return { ...state, buttonLabel: label }
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

  useEffect(() => {
    dispatch({ type: 'UPDATE_BUTTON' })
  }, [state.gameState, state.currentCardIndex])

  const handleButtonClick = useCallback(() => {
    dispatch({ type: 'SET_CARD_INDEX', payload: state.currentCardIndex })
    navigate('/')
  }, [navigate, state.currentCardIndex])

  const contextValue = { state, dispatch, handleButtonClick }

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
