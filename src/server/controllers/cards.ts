import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import Card from '../../components/elements/Card/Card'
import Cards from '../data/baseData'

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

  const id = randomUUID()
  const newCard: Card = { id, front, back }
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
