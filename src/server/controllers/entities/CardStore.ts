import { CardProps } from '../../../shared/CardProps'
import { cards as InitialCards } from '../data'

class CardStore {
  private cards: CardProps[] = [...InitialCards]

  getCards(): CardProps[] {
    return this.cards
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
