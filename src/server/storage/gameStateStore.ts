import { Game } from '../controllers/entities/Game'

const gameStateStore: Record<string, Game> = {}

export const addGame = (username: string, game: Game) => {
  gameStateStore[username] = game
}

export const getGame = (username: string): Game => {
  return gameStateStore[username]
}

export const deleteGame = (username: string) => {
  delete gameStateStore[username]
}
