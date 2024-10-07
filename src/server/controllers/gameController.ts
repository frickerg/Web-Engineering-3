import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { CardProps } from '../../shared/CardProps'
import { cardStore } from '../entities/CardStore'
import { GameStore } from '../entities/GameStore'
import { userStore } from '../entities/UserStore'
import { AuthenticatedRequest } from '../middleware/authMiddleware'
import { addGame, getGame, deleteGame } from '../storage/games'
import { GameState } from '../../shared/GameState'

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

export const startNewGame = async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest
  const username = authenticatedReq.user?.username

  if (username == null || !userStore.hasUser(username)) {
    return res.sendStatus(403)
  }

  const randomCards = cardStore.getRandomCards()
  const game = new GameStore(username, randomCards)

  addGame(username, game)

  res
    .status(200)
    .send({ currentCard: game.getCurrentCard(), gameSize: game.getGameSize() })
}

export const submitAnswer = async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest
  const username = authenticatedReq.user?.username
  if (username == null || !userStore.hasUser(username)) {
    return res.sendStatus(403)
  }

  const { cardId, answer } = req.body

  const game = getGame(username)

  if (!game) {
    return res.status(404).send('Game not found')
  }

  try {
    const { isCorrect, nextCard } = game.submitAnswer(cardId, answer)
    res.status(200).send({ isCorrect, nextCard, progress: game.getProgress() })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message)
    }
    return res.status(400).send('An unknown error occurred')
  }
}

export const getGameResults = (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest
  const username = authenticatedReq.user?.username
  if (username == null || !userStore.hasUser(username)) {
    return res.sendStatus(403)
  }

  const game = getGame(username)

  if (!game) {
    return res.status(404).send('Game not found')
  }

  res.status(200).send({ results: game.getResults() })
}

export const getCurrentGame = (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest
  const username = authenticatedReq.user?.username

  if (username == null || !userStore.hasUser(username)) {
    return res.sendStatus(403)
  }

  const game = getGame(username)

  if (!game) {
    return res.status(200).send({ gameState: GameState.NOT_STARTED })
  }

  res.status(200).send({
    currentCard: game.getCurrentCard(),
    gameSize: game.getGameSize(),
    progress: game.getProgress(),
    gameState: game.getGameState(),
    gameCards: game.getGameCards(),
  })
}

export const deleteRunningGame = (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest
  const username = authenticatedReq.user?.username

  if (username == null || !userStore.hasUser(username)) {
    return res.sendStatus(403)
  }

  const game = getGame(username)

  if (!game) {
    return res.status(404).send('No active game found for this user')
  }

  deleteGame(username)

  res.status(200).send({ message: 'Game deleted successfully' })
}
