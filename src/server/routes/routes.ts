import express from 'express'
import {
  addCard,
  deleteCard,
  getCards,
  getGameSize,
  updateCard,
} from '../controllers/gameController'
import { generatePassword, login } from '../controllers/authController'
import { authenticateJwt, authorizeRole } from '../middleware'

const router = express.Router()

// TODO(fjv): definieren welche endpoints geschützte Ressourcen sind...
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

router.get('/passwordGenerator/:password', generatePassword)
router.post('/login', login)

export default router
