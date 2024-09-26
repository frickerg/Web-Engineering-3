import { UserRole } from '../../shared/UserRole'

export type LoginResponse = {
  username: string
  role: UserRole
  token: string
}
