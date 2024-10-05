import { UserRole } from '../../shared/UserRole'
import { Token } from '../session/useAuthToken'

export type AuthenticatedUser = {
  username: string
  role: UserRole
  token: Token
}
