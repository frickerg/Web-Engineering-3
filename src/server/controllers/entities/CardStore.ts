import { CardProps } from '../../../shared/CardProps'
import { cards } from '../data'

class CardStore {
  private cards: CardProps[] = [...cards]

  getCards(): CardProps[] {
    return this.cards
  }

  getCardById(id: string): CardProps | undefined {
    return this.cards.find(card => card.id === id)
  }

  addCard(card: CardProps): void {
    this.cards.push(card)
  }

  updateCard(id: string, card: Partial<CardProps>): CardProps | undefined {
    const cardIndex = this.cards.findIndex(card => card.id === id)
    if (cardIndex === -1) {
      return undefined
    }

    this.cards[cardIndex] = { ...this.cards[cardIndex], ...card }
    return this.cards[cardIndex]
  }

  deleteCard(id: string): void {
    this.cards = this.cards.filter(card => card.id !== id)
  }
}

export const cardStore = new CardStore()
