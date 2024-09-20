import { CardProps } from '../../shared/types'

export type InputType = 'front' | 'back'
export type SortDirection = 'asc' | 'desc'

export type GameResultItem = CardProps & {
  answer?: string
  isAccepted?: boolean
}
