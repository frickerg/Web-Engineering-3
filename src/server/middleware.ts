import { Request, Response, NextFunction } from 'express'
import * as jose from 'jose'

const secret = new TextEncoder().encode('MyVerySecureSecret')

interface AuthenticatedRequest extends Request {
  user?: any
}

export const authenticateJwt = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]
    // TODO(fjv): was benutzen wir <if() return> oder <if() { return }>
    if (!token) {
      return res.sendStatus(401)
    }

    const jwt = await jose.jwtVerify(token, secret)
    req.user = jwt.payload

    console.log(jwt.payload.username)
    console.log(jwt.payload.role)

    next()
  } catch (e) {
    console.error(e)
    res.sendStatus(403)
  }
}
