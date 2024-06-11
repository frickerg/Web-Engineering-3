import { CardProps } from '../../model/Card'
import { GameState } from '../../model/Game'
import { fetchGameSize } from '../api'
import { Action } from './Context'

function getRandomCards(array: CardProps[], numberOfEntries: number) {
  if (numberOfEntries > array.length) return []
  const result = new Set<CardProps>()
  while (result.size < numberOfEntries) {
    const randomIndex = Math.floor(Math.random() * array.length)
    result.add(array[randomIndex])
  }
  return Array.from(result)
}

export async function startNewGame(
  storeCards: CardProps[],
  dispatch: React.Dispatch<Action>
) {
  await fetchGameSize()
    .then(size => {
      dispatch({
        type: 'INIT_GAME',
        payload: getRandomCards(storeCards, size),
      })
    })
    .catch(error => console.error(error))
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
