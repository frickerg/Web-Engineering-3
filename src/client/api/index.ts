import { CardProps } from '../../shared/CardProps'
import { Token } from '../session/useAuthToken'
import { AuthenticatedUser } from './AuthenticatedUser'
import { GameResultItem } from '../common/types'
import { GameState } from '../../shared/GameState'

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

function mapCardToGameResultItem(card: CardProps): GameResultItem {
  return {
    ...card,
    answer: undefined,
    isCorrect: undefined,
  }
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

export const startNewGame = async (
  token: Token
): Promise<{ currentCard: GameResultItem; gameSize: number }> => {
  const response = await request<{ currentCard: CardProps; gameSize: number }>(
    '/api/startGame',
    token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const currentCard = mapCardToGameResultItem(response.currentCard)

  return { currentCard, gameSize: response.gameSize }
}

export const submitAnswer = async (
  cardId: string,
  answer: string,
  token: Token
): Promise<{
  isCorrect: boolean
  nextCard: GameResultItem
  progress: number
}> => {
  const response = await request<{
    isCorrect: boolean
    nextCard: CardProps
    progress: number
  }>('/api/submitAnswer', token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cardId, answer }),
  })

  const nextCard = mapCardToGameResultItem(response.nextCard)

  return {
    isCorrect: response.isCorrect,
    nextCard,
    progress: response.progress,
  }
}

export const fetchGameResults = async (
  token: Token
): Promise<{ results: GameResultItem[] }> => {
  return request<{ results: GameResultItem[] }>(`/api/gameResults`, token)
}

export interface CurrentGameState {
  currentCard: GameResultItem | null
  gameSize: number
  progress: number
  gameState: GameState
  gameCards: GameResultItem[]
}

export const fetchCurrentGame = async (
  token: Token
): Promise<CurrentGameState | null> => {
  return await request<CurrentGameState>('/api/currentGame', token)
}

export const deleteGame = async (token: Token): Promise<void> => {
  await request<void>('/api/game', token, {
    method: 'DELETE',
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

  console.log('login', data)

  return {
    username: username,
    role: data.role,
    token: data.token,
  } as AuthenticatedUser
}
