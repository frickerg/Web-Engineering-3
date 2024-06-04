import { CardProps } from '../../model/Card'
import { GameSize } from '../../model/Game'

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options)
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
  return request<CardProps[]>('/api/cards/getCards')
}

export const updateCard = async (card: CardProps): Promise<void> => {
  await request<void>(`/api/cards/updateCard/${card.id}`, {
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
  return request<CardProps>('/api/cards/addCard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  })
}

export const deleteCard = async (id: string): Promise<void> => {
  await request<void>(`/api/cards/deleteCard/${id}`, {
    method: 'DELETE',
  })
}

export const fetchGameSize = async (): Promise<number> => {
  return (await request<GameSize>(`/api/cards/fetchGameSize`)).gameSize
}
