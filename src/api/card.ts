import type { CardProps } from '../model/Card'

export const fetchCards = async (): Promise<CardProps[]> => {
  const response = await fetch('/api/cards/getCards')
  if (!response.ok) {
    throw new Error(`HTTP status: ${response.status} - Failed to fetch cards.`)
  }
  return response.json()
}

export const updateCard = async (card: CardProps) => {
  const response = await fetch(`/api/cards/updateCard/${card.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(card),
  })
  if (!response.ok) {
    throw new Error(`HTTP status: ${response.status} - Failed to update card.`)
  }
}

export const addCard = async (card: {
  front: string
  back: string
}): Promise<CardProps> => {
  const response = await fetch('/api/cards/addCard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  })
  if (!response.ok) {
    throw new Error(`HTTP status: ${response.status} - Failed to add card.`)
  }
  return response.json()
}

export const deleteCard = async (id: string) => {
  const response = await fetch(`/api/cards/deleteCard/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`HTTP status: ${response.status} - Failed to delete card.`)
  }
}

export const fetchGameSize = async (): Promise<number> => {
  const response = await fetch(`/api/cards/fetchGameSize`)
  if (!response.ok) {
    throw new Error(
      `HTTP status: ${response.status} - Failed to fetch game size.`
    )
  }
  const data = await response.json()
  return data.gameSize
}
