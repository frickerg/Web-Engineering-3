import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { CardProps, FlashcardProps } from '../../model/Card'
import InitialCards from '../data/cards'

// Mutable data structure for cards
let Cards = [...InitialCards] // FIXME thats not clean

export const getCards = (_req: Request, res: Response) => {
  res.send(Cards)
}

export const getCardById = (req: Request, res: Response) => {
  const card = Cards.find(c => c.id === req.params.id)
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
  Cards.push(newCard)
  res.status(201).send(newCard)
}

export const updateCard = (req: Request, res: Response) => {
  const card = Cards.find(c => c.id === req.params.id)
  if (!card) {
    return res.status(404).send('Card not found')
  }
  card.front = req.body.front
  card.back = req.body.back
  res.send(card)
}

export const deleteCard = (req: Request, res: Response) => {
  Cards = Cards.filter(c => c.id !== req.params.id)
  res.status(204).send()
}

export const getGameCards = (req: Request, res: Response) => {
  const numberOfEntries = Number(req.params.numberOfEntries) ?? 0
  if (numberOfEntries === 0) {
    return res.status(400).send('request at least 1 card')
  }
  const randomGameCards = getRandomEntries(Cards, numberOfEntries)
  if (randomGameCards.length < numberOfEntries) {
    return res.status(400).send('more elements taken than available')
  }
  res.send(mapCardToFlashcard(randomGameCards))
}

function mapCardToFlashcard(cards: CardProps[]): FlashcardProps[] {
  return cards.map(card => ({
    id: card.id,
    front: card.front,
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
