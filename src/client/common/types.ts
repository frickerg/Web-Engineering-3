import { CardProps } from '../../shared/types'

export type InputType = 'front' | 'back'
export type SortDirection = 'asc' | 'desc'

export type GameResultItem = CardProps & {
  answer?: string
  isAccepted?: boolean
}

export type ChildrenProps = {
  children: React.ReactNode
}

export type LinkProps = ChildrenProps & {
  to: string
}
