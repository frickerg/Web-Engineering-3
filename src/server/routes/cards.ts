import express from 'express'
import * as cardsController from '../controllers/cards'

const router = express.Router()

router.get('/', cardsController.getCards)
router.get('/:id', cardsController.getCardById)
router.post('/', cardsController.addCard)
router.put('/:id', cardsController.updateCard)
router.delete('/:id', cardsController.deleteCard)
router.get('/getGameCards/:numberOfEntries', cardsController.getGameCards)

export default router
