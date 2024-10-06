import { Request, Response, NextFunction } from 'express'
import { jwtVerify } from 'jose'
import { JWT_SECRET } from '../../config'
import { UserStoreProps } from '../controllers/entities/UserStore'
import { UserRole } from '../../shared/UserRole'

type JwtPayloadProps = {
  username: string
  role: UserRole
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
      console.log('No token provided')
      return res.status(401).send('Access denied')
    }

    console.log('Token provided')

    await jwtVerify(token, secret)
      .then(jwt => {
        req.user = jwt.payload as JwtPayloadProps
        console.log(`User: ${jwt.payload.username} Role: ${jwt.payload.role}`)
        next()
      })
      .catch(e => {
        console.error('Token verification failed:', e)
        return res.status(401).send('Invalid token.')
      })
  } catch (e) {
    console.error('Authentication error:', e)
    return res.status(403).send('Authentication error')
  }
}

export const authorizeRole = (roles: Array<UserStoreProps['role']>) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user as UserStoreProps
    if (!user || !roles.includes(user.role)) {
      console.log('Access denied for user:', user ? user.username : 'unknown')
      return res.status(403).send('Access denied')
    }
    next()
  }
}
