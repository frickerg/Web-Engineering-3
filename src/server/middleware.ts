import { Request, Response, NextFunction } from 'express'
import * as jose from 'jose'
import { JWT_SECRET } from '../config'

type JwtPayloadProps = {
  username: string
  role: string
}

type AuthenticatedRequest = Request & {
  user?: JwtPayloadProps
}

const secret = new TextEncoder().encode(JWT_SECRET)

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
