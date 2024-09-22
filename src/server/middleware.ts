import { Request, Response, NextFunction } from 'express'
import { jwtVerify } from 'jose'
import { JWT_SECRET } from '../config'
import { UserProps } from '../shared/UserProps'

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
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]
    if (!token) {
      return res.sendStatus(401).send('Access denied')
    }

    await jwtVerify(token, secret)
      .then(jwt => {
        req.user = jwt.payload as JwtPayloadProps
        console.log(jwt.payload.username)
        console.log(jwt.payload.role)
        next()
      })
      .catch(e => {
        console.error(e)
        res.status(400).send('Invalid token.')
      })
  } catch (e) {
    console.error(e)
    res.sendStatus(403)
  }
}

export const authorizeRole = (roles: Array<UserProps['role']>) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user as UserProps
    if (!user || !roles.includes(user.role)) {
      return res.status(403).send('Access denied')
    }
    next()
  }
}
