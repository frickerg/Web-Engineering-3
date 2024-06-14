import express from 'express'
import * as cardsController from '../controllers/cardController'

const router = express.Router()

router.get('/getCards', cardsController.getCards)
router.get('/getGameSize', cardsController.getGameSize)
router.post('/addCard', cardsController.addCard)
router.put('/updateCard/:id', cardsController.updateCard)
router.delete('/deleteCard/:id', cardsController.deleteCard)

export default router
