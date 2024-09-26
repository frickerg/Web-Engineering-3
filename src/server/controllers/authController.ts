import { Request, Response } from 'express'
import { randomBytes, scrypt } from 'crypto'
import { SignJWT } from 'jose'
import { userStore } from './entities/UserStore'
import { JWT_SECRET } from '../../config'
import { UserRole } from '../../shared/UserRole'

export const generatePassword = async (req: Request, res: Response) => {
  const password = req.params.password
  const salt = randomBytes(16).toString('hex')
  const passwordHash = await createPasswordHash(password, salt)
  res.status(200).send({ passwordHash, salt })
  console.log(`Password hash: ${passwordHash}, salt: ${salt}`)
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = userStore.findUserByUsername(username)
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
  // FIXME: Ist das okay die rolle so zu senden?
  res.status(200).send({ token, role: user.role })

  console.log(`User ${username} logged in`)
}

const createPasswordHash = async (password: string, salt: string) => {
  const hash = await new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        return reject(error)
      }
      resolve(derivedKey.toString('hex'))
    })
  })
  return hash
}

const secret = new TextEncoder().encode(JWT_SECRET)

const generateJwt = (username: string, role: UserRole) => {
  return new SignJWT({ username, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
}
