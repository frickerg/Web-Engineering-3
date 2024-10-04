import express from 'express'
import {
  addCard,
  deleteCard,
  getCards,
  getGameSize,
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
router.get(
  '/gameSize',
  authenticateJwt,
  authorizeRole(['admin', 'player']),
  getGameSize
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
  '/submitAnswer',
  authenticateJwt,
  authorizeRole(['admin', 'player']),
  submitAnswer
)

router.get('/passwordGenerator/:password', generatePassword)
router.post('/login', login)

export default router
