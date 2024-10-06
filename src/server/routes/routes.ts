import express from 'express'
import {
  addCard,
  deleteCard,
  deleteRunningGame,
  getCards,
  getCurrentGame,
  getGameResults,
  startNewGame,
  submitAnswer,
  updateCard,
} from '../controllers/gameController'
import { generatePassword, login } from '../controllers/authController'
import { authenticateJwt, authorizeRole } from '../middleware/authMiddleware'

const router = express.Router()

router.get(
  '/cards',
  authenticateJwt,
  authorizeRole(['admin', 'player']),
  getCards
)
router.post('/card', authenticateJwt, authorizeRole(['admin']), addCard)
router.put('/card/:id', authenticateJwt, authorizeRole(['admin']), updateCard)
router.delete(
  '/card/:id',
  authenticateJwt,
  authorizeRole(['admin']),
  deleteCard
)

router.post(
  '/startGame',
  authenticateJwt,
  authorizeRole(['admin', 'player']),
  startNewGame
)
router.post(
  '/submitAnswer',
  authenticateJwt,
  authorizeRole(['admin', 'player']),
  submitAnswer
)
router.get(
  '/gameResults',
  authenticateJwt,
  authorizeRole(['admin', 'player']),
  getGameResults
)
router.get(
  '/currentGame',
  authenticateJwt,
  authorizeRole(['admin', 'player']),
  getCurrentGame
)
router.delete(
  '/game',
  authenticateJwt,
  authorizeRole(['admin', 'player']),
  deleteRunningGame
)

router.get('/passwordGenerator/:password', generatePassword)
router.post('/login', login)

export default router
