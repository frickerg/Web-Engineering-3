import { Request, Response, NextFunction } from 'express'
import * as jose from 'jose'
import { JwtPayloadProps } from '../shared/JwtPayloadProps'
import { JWT_SECRET } from '../config'

const secret = new TextEncoder().encode(JWT_SECRET)

type AuthenticatedRequest = Request & {
  user?: JwtPayloadProps
}

export const authenticateJwt = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]
    if (!token) {
      return res.sendStatus(401)
    }

    const jwt = await jose.jwtVerify(token, secret)
    req.user = jwt.payload as JwtPayloadProps

    console.log(jwt.payload.username)
    console.log(jwt.payload.role)

    next()
  } catch (e) {
    console.error(e)
    res.sendStatus(403)
  }
}
