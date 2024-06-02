import express from 'express'
import * as cardsController from '../controllers/cards'

const router = express.Router()

router.get('/getCards', cardsController.getCards)
router.post('/addCard', cardsController.addCard)
router.put('/updateCard/:id', cardsController.updateCard)
router.delete('/deleteCard/:id', cardsController.deleteCard)
router.get('/fetchGameSize', cardsController.fetchGameSize)

export default router
