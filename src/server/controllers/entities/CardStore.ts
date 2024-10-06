import { CardProps } from '../../../shared/CardProps'
import { cards } from '../cards'

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

  getRandomCards(): CardProps[] {
    const max = cards.length > 10 ? 10 : cards.length
    const min = cards.length >= 3 ? 3 : cards.length
    const randomAmount = Math.floor(Math.random() * (max - min + 1) + min)
    const shuffledCards = [...this.cards].sort(() => Math.random() - 0.5)
    return shuffledCards.slice(0, randomAmount)
  }
}

export const cardStore = new CardStore()
