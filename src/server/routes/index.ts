import express from 'express'
import {
  getCards,
  getGameSize,
  addCard,
  updateCard,
  deleteCard,
} from '../controllers/controller'

const router = express.Router()

router.get('/cards', getCards)
router.get('/gameSize', getGameSize)
router.post('/card', addCard)
router.put('/card/:id', updateCard)
router.delete('/card/:id', deleteCard)

export default router
