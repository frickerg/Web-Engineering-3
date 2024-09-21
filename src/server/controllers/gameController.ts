import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { CardProps } from '../../shared/CardProps'
import { cardStore } from './entities/CardStore'

export const getCards = (_req: Request, res: Response) => {
  res.status(200).send(cardStore.getCards())
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
  res.status(200).send(updatedCard)
}

export const deleteCard = (req: Request, res: Response) => {
  cardStore.deleteCard(req.params.id)
  res.status(204).send()
}

function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getGameSize = (_req: Request, res: Response) => {
  const cards = cardStore.getCards()
  const maxIndex = cards.length > 10 ? 10 : cards.length
  const minIndex = cards.length >= 3 ? 3 : cards.length
  const randomGameSize = randomNumberBetween(minIndex, maxIndex)

  if (cards.length < randomGameSize) {
    return res.status(400).send('More elements taken than available')
  }

  res.status(200).send({ gameSize: randomGameSize })
}
