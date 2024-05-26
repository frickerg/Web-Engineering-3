import express from 'express'
import * as cardsController from '../controllers/cards'

const router = express.Router()

router.get('/', cardsController.getCards)
router.get('/getGameCards', cardsController.getGameCards)
router.get('/:id', cardsController.getCardById)
router.post('/', cardsController.addCard)
router.put('/:id', cardsController.updateCard)
router.delete('/:id', cardsController.deleteCard)

export default router
