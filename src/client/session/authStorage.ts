import { UserRole } from '../../shared/UserRole'
import { AuthenticatedUser } from '../api/AuthenticatedUser'
import { Token } from './useAuthToken'

export const saveAuthToLocalStorage = (
  token: Token,
  username: string,
  role: UserRole
) => {
  localStorage.setItem('token', token as string)
  localStorage.setItem('username', username)
  localStorage.setItem('role', role?.toString() ?? '')
}

export const removeAuthFromLocalStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('role')
}

export const getAuthFromLocalStorage = (): {
  token: Token
  username: string | null
  role: UserRole
} => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role') as UserRole | null
  return { token, username, role } as AuthenticatedUser
}

export const saveTokenToLocalStorage = (token: Token) => {
  localStorage.setItem('token', token as string)
}

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token')
}

export const getTokenFromLocalStorage = (): Token => {
  return localStorage.getItem('token')
}
