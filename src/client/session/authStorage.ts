import { UserRole } from '../../shared/UserRole'

export const saveAuthToLocalStorage = (
  token: string,
  username: string,
  role: UserRole
) => {
  localStorage.setItem('token', token)
  localStorage.setItem('username', username)
  localStorage.setItem('role', role?.toString() ?? '')
}

export const removeAuthFromLocalStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('role')
}

export const loadAuthFromLocalStorage = (): {
  token: string | null
  username: string | null
  role: UserRole | null
} => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const role = localStorage.getItem('role') as UserRole | null
  return { token, username, role }
}

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem('token', token)
}

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token')
}

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('token')
}
