import { CardProps } from '../model/Card'
import { GameResultItem } from './GameContext'
import { fetchGameSize } from './card'

export function mapCardToGameResultItem(cards: CardProps[]): GameResultItem[] {
  return cards.map(card => ({
    id: card.id,
    front: card.front,
    back: card.back,
    answer: '',
    isAccepted: false,
  }))
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

export async function startNewGame(
  cardStateCards: CardProps[],
  dispatch: React.Dispatch<any>
) {
  try {
    const numberOfEntries = await fetchGameSize()
    const randomGameCards = getRandomEntries(cardStateCards, numberOfEntries)
    dispatch({
      type: 'INIT_GAME',
      payload: mapCardToGameResultItem(randomGameCards),
    })
  } catch (error) {
    console.error(error)
  }
}
