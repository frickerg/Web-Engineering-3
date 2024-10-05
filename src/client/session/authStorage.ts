import { UserRole } from '../../shared/UserRole'
import { Token } from '../api'

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

export const loadAuthFromLocalStorage = (): {
  token: Token
  username: string | null
  role: UserRole | null
} => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role') as UserRole | null
  return { token, username, role }
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
