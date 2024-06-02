import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { CardProps, FlashcardProps } from '../../model/Card'
import cardStore from '../store/CardStore'

export const getCards = (_req: Request, res: Response) => {
  res.send(cardStore.getCards())
}

export const getCardById = (req: Request, res: Response) => {
  const card = cardStore.getCardById(req.params.id)
  if (!card) {
    return res.status(404).send('Card not found')
  }
  res.send(card)
}

export const addCard = (req: Request, res: Response) => {
  const { front, back } = req.body

  if (!front || !back) {
    return res.status(400).send('Front and Back are required')
  }

  const newCard: CardProps = { id: randomUUID(), front, back }
  cardStore.addCard(newCard)
  res.status(201).send(newCard)
}

export const updateCard = (req: Request, res: Response) => {
  const updatedCard = cardStore.updateCard(req.params.id, req.body)
  if (!updatedCard) {
    return res.status(404).send('Card not found')
  }
  res.send(updatedCard)
}

export const deleteCard = (req: Request, res: Response) => {
  cardStore.deleteCard(req.params.id)
  res.status(204).send()
}

// TODO backend but not over api
export const fetchFlashcards = (_req: Request, res: Response) => {
  const cards = cardStore.getCards()
  const maxIndex = cards.length > 10 ? 10 : cards.length
  const numberOfEntries = randomNumberBetween(3, maxIndex)

  const randomGameCards = getRandomEntries(cards, numberOfEntries)
  if (randomGameCards.length < numberOfEntries) {
    return res.status(400).send('more elements taken than available')
  }
  res.send(mapCardToFlashcard(randomGameCards))
}

function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function mapCardToFlashcard(cards: CardProps[]): FlashcardProps[] {
  return cards.map(card => ({
    id: card.id,
    query: card.front,
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
