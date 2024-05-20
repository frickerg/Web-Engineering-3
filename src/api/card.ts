import type { CardProps } from '../model/Card'

export const fetchCards = async (): Promise<CardProps[]> => {
  const response = await fetch('/api/cards')
  if (!response.ok) {
    throw new Error(`HTTP status: ${response.status} - Failed to fetch cards `)
  }
  return response.json()
}

export const fetchCardById = async (id: string): Promise<CardProps> => {
  const response = await fetch(`/api/cards/${id}`)
  if (!response.ok) {
    throw new Error(`HTTP status: ${response.status} - Failed to fetch card `)
  }
  return response.json()
}

export const saveCard = async (card: CardProps) => {
  await fetch(`/api/cards/${card.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(card),
  })
}
