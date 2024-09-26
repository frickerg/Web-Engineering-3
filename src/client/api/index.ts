import { CardProps } from '../../shared/CardProps'
import { LoginResponse } from './LoginResponse'

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${getToken()}`,
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
    // TODO(fjv): Bei unautorisierten Anfragen, sollte was passieren? zB. Login-Seite anzeigen?
    const errorText = await response.text()
    throw new Error(`HTTP status: ${response.status} - ${errorText}`)
  }
  return response
}

export const fetchCards = async (): Promise<CardProps[]> => {
  return request<CardProps[]>('/api/cards')
}

export const updateCard = async (card: CardProps): Promise<void> => {
  await request<void>(`/api/card/${card.id}`, {
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
  return request<CardProps>('/api/card', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  })
}

export const deleteCard = async (id: string): Promise<void> => {
  await request<void>(`/api/card/${id}`, {
    method: 'DELETE',
  })
}

type GameSize = { gameSize: number }
export const fetchGameSize = async (): Promise<number> => {
  return (await request<GameSize>(`/api/gameSize`)).gameSize
}

let token: string | null = null

// TODO: Issue: Token-Managment
// const setToken = (newToken: string) => {
//   token = newToken
// }

const getToken = () => {
  if (!token) {
    token = localStorage.getItem('token')
  }
  return token
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  await checkResponse(response)
  const data = await response.json()

  console.log('login', data)
  return {
    username: username,
    role: data.role,
    token: data.token,
  } as LoginResponse
}
