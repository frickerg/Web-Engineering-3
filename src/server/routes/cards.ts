import express from 'express'
import * as cardsController from '../controllers/cards'

const router = express.Router()

router.get('/', cardsController.getCards)
router.get('/:id', cardsController.getCardById)
router.post('/', cardsController.addCard)
router.put('/:id', cardsController.updateCard)

export default router
