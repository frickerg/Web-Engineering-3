import { CardProps } from '../../shared/CardProps'
import { Token } from '../session/useAuthToken'
import { saveTokenToLocalStorage } from '../session/authStorage'
import { AuthenticatedUser } from './AuthenticatedUser'

const request = async <T>(
  url: string,
  token: Token,
  options?: RequestInit
): Promise<T> => {
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
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

export const fetchCards = async (token: Token): Promise<CardProps[]> => {
  return request<CardProps[]>('/api/cards', token)
}

export const updateCard = async (
  card: CardProps,
  token: Token
): Promise<void> => {
  await request<void>(`/api/card/${card.id}`, token, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  })
}

export const addCard = async (
  card: Omit<CardProps, 'id'>,
  token: Token
): Promise<CardProps> => {
  return request<CardProps>('/api/card', token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  })
}

export const deleteCard = async (id: string, token: Token): Promise<void> => {
  await request<void>(`/api/card/${id}`, token, {
    method: 'DELETE',
  })
}

type GameSize = { gameSize: number }
export const fetchGameSize = async (token: Token): Promise<number> => {
  return (await request<GameSize>(`/api/gameSize`, token)).gameSize
}

export const submitAnswer = (cardId: string, answer: string, token: Token) => {
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

  // FIXME Ist das sinvoll vlt für das testen? oder nur im AuthContext?
  saveTokenToLocalStorage(data.token)

  console.log('login', data)

  return {
    username: username,
    role: data.role,
    token: data.token,
  } as AuthenticatedUser
}
