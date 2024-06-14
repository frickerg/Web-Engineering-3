import express from 'express'
import {
  getCards,
  getGameSize,
  addCard,
  updateCard,
  deleteCard,
} from '../controllers/controller'

const router = express.Router()

router.get('/getCards', getCards)
router.get('/getGameSize', getGameSize)
router.post('/addCard', addCard)
router.put('/updateCard/:id', updateCard)
router.delete('/deleteCard/:id', deleteCard)

export default router
