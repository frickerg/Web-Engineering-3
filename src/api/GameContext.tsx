/**
 * TODO Eventuelle Verbesserung
 * Man könnte auch nur die ID und answer übergeben. Über ID würde man die Karte fetchen
 * und die Antwort würde man dynamisch Vergleichen. Setzt voraus, dass man weiss, welche Seite abgefragt wurde :)
 */

import React, {
  createContext,
  useReducer,
  ReactNode,
  useMemo,
  useEffect,
} from 'react'
import { CardProps } from '../client/components/elements/Card/Card'
import { useNavigate } from 'react-router-dom'

export interface GameResultItem extends CardProps {
  answer: string
  isAccepted: boolean
}

export enum GameState {
  NOT_STARTED = 'NOT_STARTED',
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED',
}

type State = {
  cards: GameResultItem[]
  gameState: GameState
  buttonLabel: string
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

type NavigateAction = {
  type: 'NAVIGATE'
  payload: { navigate: (path: string) => void }
}

type Action =
  | SetCardsAction
  | DeleteGameAction
  | FinishGameAction
  | UpdateButtonAction
  | NavigateAction

type Props = {
  state: State
  dispatch: React.Dispatch<Action>
  handleButtonClick: () => void
}

const initialState: State = {
  cards: [],
  gameState: GameState.NOT_STARTED,
  buttonLabel: 'Start New Game',
}

const gameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: action.payload, gameState: GameState.ONGOING }
    case 'DELETE_GAME':
      return { ...state, cards: [], gameState: GameState.NOT_STARTED }
    case 'FINISH_GAME':
      return { ...state, gameState: GameState.FINISHED }
    case 'UPDATE_BUTTON': {
      let label
      if (state.gameState === GameState.ONGOING && state.cards.length > 0) {
        label = 'Continue Game'
      } else if (state.gameState === GameState.FINISHED) {
        label = 'Finished'
      } else {
        label = 'Start New Game'
      }
      return { ...state, buttonLabel: label }
    }
    case 'NAVIGATE':
      if (state.gameState === GameState.ONGOING && state.cards.length > 0) {
        action.payload.navigate('/ongoing')
      } else if (state.gameState === GameState.FINISHED) {
        action.payload.navigate('/end')
      } else {
        action.payload.navigate('/')
      }
      return state
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
  }, [state.gameState])

  const handleButtonClick = () => {
    dispatch({ type: 'NAVIGATE', payload: { navigate } })
  }

  /* TODO You might have to use something other than useMemo here
   * sonarlint(typescript:S6481)
   * The object passed as the value prop to the Context provider changes every render.
   * To fix this consider wrapping it in a useMemo hook.
   * (property) dispatch: React.Dispatch<Action>
   */
  const contextValue = useMemo(
    () => ({ state, dispatch, handleButtonClick }),
    [state, dispatch]
  )

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
