import { CardProps } from '../model/Card'
import { GameResultItem } from './GameContext'

export function mapCardToGameResultItem(cards: CardProps[]): GameResultItem[] {
  return cards.map(card => ({
    id: card.id,
    front: card.front,
    back: card.back,
    answer: '',
    isAccepted: false,
  }))
}
