import { useContext } from 'react'
import { CardProps } from '../../shared/CardProps'
import { AuthContext } from '../session/AuthContext'
import { saveTokenToLocalStorage } from '../session/authStorage'
import { AuthenticatedUser } from './AuthenticatedUser'

const useAuthToken = () => {
  const { state } = useContext(AuthContext)
  return state.user?.token ?? null
}

const request = async <T>(
  url: string,
  token: string | null,
  options?: RequestInit
): Promise<T> => {
  const headers = {
    ...options?.headers,
    Authorization: token ? `Bearer ${token}` : undefined,
  }
  const response = await fetch(url, {
    ...options,
    headers,
  })

  await checkResponse(response)
  if (
    response.headers.get('Content-Length') === '0' ||
    response.status === 204
  ) {
    return null as unknown as T
  }
  return response.json()
}

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP status: ${response.status} - ${errorText}`)
  }
  return response
}

export const fetchCards = async (): Promise<CardProps[]> => {
  const token = useAuthToken() // Hook innerhalb einer Komponente oder eines anderen Hooks aufrufen
  return request<CardProps[]>('/api/cards', token)
}

export const updateCard = async (card: CardProps): Promise<void> => {
  const token = useAuthToken()
  await request<void>(`/api/card/${card.id}`, token, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  })
}

export const addCard = async (
  card: Omit<CardProps, 'id'>
): Promise<CardProps> => {
  const token = useAuthToken()
  return request<CardProps>('/api/card', token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  })
}

export const deleteCard = async (id: string): Promise<void> => {
  const token = useAuthToken()
  await request<void>(`/api/card/${id}`, token, {
    method: 'DELETE',
  })
}

type GameSize = { gameSize: number }
export const fetchGameSize = async (): Promise<number> => {
  const token = useAuthToken()
  return (await request<GameSize>(`/api/gameSize`, token)).gameSize
}

export const submitAnswer = (cardId: string, answer: string) => {
  const token = useAuthToken()
  return request<{ isAccepted: boolean }>(`/api/submitAnswer`, token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cardId, answer }),
  })
}

export const login = async (
  username: string,
  password: string
): Promise<AuthenticatedUser> => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  await checkResponse(response)
  const data = await response.json()

  saveTokenToLocalStorage(data.token)

  return {
    username: username,
    role: data.role,
    token: data.token,
  } as AuthenticatedUser
}
