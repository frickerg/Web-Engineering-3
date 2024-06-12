import { CardProps } from './Card'

export type GameSize = {
  gameSize: number
}

export type GameResultItem = CardProps & {
  answer?: string
  isAccepted?: boolean
}

export enum GameState {
  NOT_STARTED = 'NOT_STARTED',
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED',
}
