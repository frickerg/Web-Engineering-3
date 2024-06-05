import { CardProps } from './Card'

export type GameSize = {
  gameSize: number
}

export type GameAnswer = CardProps & {
  answer: string
  isAnswerAccepted: boolean
}

export enum GameState {
  NOT_STARTED = 'NOT_STARTED',
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED',
}
