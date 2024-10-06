import { startNewGame } from '../api'
import { Token } from './useAuthToken'
import { Action } from './gameReducer'

export enum GameState {
  NOT_STARTED = 'NOT_STARTED',
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED',
}

export async function handleStartNewGame(
  dispatch: React.Dispatch<Action>,
  token: Token
) {
  try {
    const { currentCard, gameSize } = await startNewGame(token)
    dispatch({
      type: 'INIT_GAME',
      payload: { gameCards: [currentCard], gameSize },
    })
  } catch (error) {
    console.error('Failed to start the game:', error)
  }
}

export function retrieveLabel(state: GameState, payload: number = 0) {
  switch (state) {
    case GameState.NOT_STARTED:
      return 'New Game'
    case GameState.ONGOING:
      return `Solve #${payload + 1}`
    case GameState.FINISHED:
      return 'Finished'
    default:
      return 'Unknown'
  }
}
