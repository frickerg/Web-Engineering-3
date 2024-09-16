import { CardProps } from '../../shared/types'

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${getToken()}`,
  }
  const response = await fetch(url, {
    ...options,
    headers,
  })

  // const response = await fetch(url, options)
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
  return request<CardProps[]>('/api/cards')
  // TODO(fjv): hier Token verwenden oder in der generic-request-function ?
  // return request<CardProps[]>('/api/cards', {
  //   method: 'GET',
  //   headers: {
  //     Authorization: `Bearer ${getToken()}`,
  //     'Content-Type': 'application/json',
  //   },
  // })
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

const setToken = (newToken: string) => {
  token = newToken
}

const getToken = () => {
  if (!token) {
    token = localStorage.getItem('token')
  }
  return token
}

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  await checkResponse(response)
  const data = await response.json()

  // TODO(fjv): local storage löschen ? oder nur token ? eigene controller-klasse ?
  // localStorage.clear()
  localStorage.setItem('token', data.token)
  // Token auch im Memory speichern
  setToken(data.token)
  return data.token
}
