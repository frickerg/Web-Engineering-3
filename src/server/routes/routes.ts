import express from 'express'
import {
  getCards,
  getGameSize,
  addCard,
  updateCard,
  deleteCard,
  generatePassword,
  login,
} from '../controllers/controller'
import { authenticateJwt } from '../middleware'

const router = express.Router()

// TODO(fjv): definieren welche endpoints geschützte Ressourcen sind...
router.get('/cards', authenticateJwt, getCards)
router.get('/gameSize', getGameSize)
router.post('/card', addCard)
router.put('/card/:id', updateCard)
router.delete('/card/:id', deleteCard)
router.get('/passwordGenerator/:password', generatePassword)
router.post('/login', login)

export default router
