import express from 'express'
import * as gameController from '../controllers/gameController'
import * as authController from '../controllers/authController'
import { authenticateJwt } from '../middleware'

const router = express.Router()

// TODO(fjv): definieren welche endpoints geschützte Ressourcen sind...
router.get('/cards', authenticateJwt, gameController.getCards)
router.get('/gameSize', gameController.getGameSize)
router.post('/card', authenticateJwt, gameController.addCard)
router.put('/card/:id', authenticateJwt, gameController.updateCard)
router.delete('/card/:id', authenticateJwt, gameController.deleteCard)

router.get('/passwordGenerator/:password', authController.generatePassword)
router.post('/login', authController.login)

export default router
