import crypto from 'crypto'
import { Request, Response } from 'express'
import { CardProps } from '../../shared/types'
import * as jose from 'jose'
import { cardStore } from './entities/CardStore'
import { userStore } from './entities/UserStore'

export const getCards = (_req: Request, res: Response) => {
  res.status(200).send(cardStore.getCards())
}

export const addCard = (req: Request, res: Response) => {
  const { front, back } = req.body

  if (!front || !back) {
    return res.status(400).send('Front and Back are required')
  }

  const newCard: CardProps = { id: crypto.randomUUID(), front, back }
  cardStore.addCard(newCard)
  res.status(201).send(newCard)
}

export const updateCard = (req: Request, res: Response) => {
  const updatedCard = cardStore.updateCard(req.params.id, req.body)
  if (!updatedCard) {
    return res.status(404).send('Card not found')
  }
  res.status(200).send(updatedCard)
}

export const deleteCard = (req: Request, res: Response) => {
  cardStore.deleteCard(req.params.id)
  res.status(204).send()
}

function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getGameSize = (_req: Request, res: Response) => {
  const cards = cardStore.getCards()
  const maxIndex = cards.length > 10 ? 10 : cards.length
  const minIndex = cards.length >= 3 ? 3 : cards.length
  const randomGameSize = randomNumberBetween(minIndex, maxIndex)

  if (cards.length < randomGameSize) {
    return res.status(400).send('More elements taken than available')
  }

  res.status(200).send({ gameSize: randomGameSize })
}

export const generatePassword = async (req: Request, res: Response) => {
  const password = req.params.password
  const salt = crypto.randomBytes(16).toString('hex')
  const passwordHash = await createPasswordHash(password, salt)
  res.status(200).send({ passwordHash, salt })
  console.log(`Password hash: ${passwordHash}, salt: ${salt}`)
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  // TODO(fjv): Search user mit UserStore (hasUser/exists?)
  const user = userStore.getUsers().find(u => u.username === username)
  if (!user) {
    console.log(`User ${username} not found`)
    return res.status(401).send('User not found')
  }

  const passwordHash = await createPasswordHash(password, user.salt)
  if (passwordHash !== user.passwordHash) {
    console.log(`Invalid password for user ${username}`)
    return res.status(401).send('Invalid password')
  }

  const token = await generateJwt(username, user.role)
  res.status(200).send({ token })

  console.log(`User ${username} logged in`)
}

// TODO(fjv): function oder const async?
const createPasswordHash = async (password: string, salt: string) => {
  const hash = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        return reject(error)
      }
      resolve(derivedKey.toString('hex'))
    })
  })
  return hash
}

// TODO(fjv): muss irgendwo anderst hin
const secret = new TextEncoder().encode('MyVerySecureSecret')

const generateJwt = (username: string, role: string) => {
  return new jose.SignJWT({ username, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
}
