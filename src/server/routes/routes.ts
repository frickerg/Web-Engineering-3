import express from 'express'
import {
  addCard,
  deleteCard,
  getCards,
  getGameSize,
  updateCard,
} from '../controllers/gameController'
import { generatePassword, login } from '../controllers/authController'
import { authenticateJwt } from '../middleware'

const router = express.Router()

// TODO(fjv): definieren welche endpoints geschützte Ressourcen sind...
router.get('/cards', authenticateJwt, getCards)
router.get('/gameSize', getGameSize)
router.post('/card', authenticateJwt, addCard)
router.put('/card/:id', authenticateJwt, updateCard)
router.delete('/card/:id', authenticateJwt, deleteCard)

router.get('/passwordGenerator/:password', generatePassword)
router.post('/login', login)

export default router
