import { GameState } from '../../shared/GameState'

export class GameStore {
  private readonly gameCards: {
    id: string
    front: string
    back: string
    answer?: string
    isCorrect?: boolean
  }[] = []
  private currentCardIndex: number = 0
  private readonly gameSize: number
  private readonly username: string
  private gameState: GameState = GameState.ONGOING

  constructor(
    username: string,
    cards: { id: string; front: string; back: string }[]
  ) {
    this.username = username
    this.gameCards = cards
    this.gameSize = cards.length
  }

  public getCurrentCard() {
    if (this.currentCardIndex >= this.gameSize) {
      return null
    }
    const { id, front } = this.gameCards[this.currentCardIndex]
    return { id, front }
  }

  public submitAnswer(cardId: string, answer: string) {
    const currentCard = this.gameCards[this.currentCardIndex]
    if (currentCard.id !== cardId) {
      throw new Error('Invalid card ID')
    }

    const isCorrect = this.validateAnswer(currentCard, answer)
    currentCard.answer = answer
    currentCard.isCorrect = isCorrect

    this.currentCardIndex += 1
    if (this.currentCardIndex >= this.gameSize) {
      this.gameState = GameState.FINISHED
    }

    return { isCorrect, nextCard: this.getCurrentCard() }
  }

  public getProgress() {
    return Math.round((this.currentCardIndex / this.gameSize) * 100)
  }

  public isFinished() {
    return this.gameState === GameState.FINISHED
  }

  public getResults() {
    return this.gameCards.map(card => ({
      id: card.id,
      front: card.front,
      back: card.back,
      answer: card.answer,
      isCorrect: card.isCorrect,
    }))
  }

  private validateAnswer(
    card: { front: string; back: string },
    answer: string
  ) {
    return card.back.toLowerCase() === answer.toLowerCase()
  }

  public getGameSize() {
    return this.gameSize
  }

  public getGameState() {
    return this.gameState
  }

  public getGameCards() {
    return this.gameCards
  }
}
