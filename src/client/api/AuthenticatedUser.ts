import { Token } from '.'
import { UserRole } from '../../shared/UserRole'

export type AuthenticatedUser = {
  username: string
  role: UserRole
  token: Token
}
