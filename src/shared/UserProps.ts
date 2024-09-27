import { UserRole } from './UserRole'

export type UserProps = {
  username: string
  role: UserRole
  passwordHash: string
  salt: string
}
