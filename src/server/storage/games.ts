import { GameStore } from '../entities/GameStore'

const games: Record<string, GameStore> = {}

export const addGame = (username: string, game: GameStore) => {
  games[username] = game
}

export const getGame = (username: string): GameStore => {
  return games[username]
}

export const deleteGame = (username: string) => {
  delete games[username]
}
