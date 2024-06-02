import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import { CardProps } from '../client/components/elements/Card/Card'
import { useNavigate } from 'react-router-dom'
import { GameState } from './GameState'
import { fetchGameSize } from './card'
import { mapCardToGameResultItem } from './cardUtils'
import { CardContext } from './CardContext'

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
      return {
        ...state,
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
  const { state: cardState } = useContext(CardContext)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: 'UPDATE_BUTTON' })
  }, [state.gameState, state.currentCardIndex])

  const handleButtonClick = useCallback(() => {
    dispatch({ type: 'SET_CARD_INDEX', payload: state.currentCardIndex })
    navigate('/')
  }, [navigate, state.currentCardIndex])

  useEffect(() => {
    const initializeGame = async () => {
      try {
        const numberOfEntries = await fetchGameSize()
        const cards = cardState.cards
        const randomGameCards = getRandomEntries(cards, numberOfEntries)
        dispatch({
          type: 'SET_CARDS',
          payload: mapCardToGameResultItem(randomGameCards),
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (state.gameState === GameState.START) {
      initializeGame()
    }
  }, [state.gameState])

  const contextValue = { state, dispatch, handleButtonClick }

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
