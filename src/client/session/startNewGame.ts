import { CardProps } from '../../model/Card'
import { fetchGameSize } from '../api'
import { Action } from './Context'

function getRandomGameCards(array: CardProps[], numberOfEntries: number) {
  if (numberOfEntries > array.length) return []
  const result = new Set<CardProps>()
  while (result.size < numberOfEntries) {
    const randomIndex = Math.floor(Math.random() * array.length)
    result.add(array[randomIndex])
  }
  return Array.from(result).map(card => ({
    ...card,
    answer: '',
    isAccepted: false,
  }))
}

export async function startNewGame(
  storeCards: CardProps[],
  dispatch: React.Dispatch<Action>
) {
  await fetchGameSize()
    .then(size => {
      dispatch({
        type: 'INIT_GAME',
        payload: getRandomGameCards(storeCards, size),
      })
    })
    .catch(error => console.error(error))
}
