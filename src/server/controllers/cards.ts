import { randomUUID } from 'crypto'
import type { CardProps } from '../../shared/CardProps'

export const cards: CardProps[] = [
  {
    id: randomUUID(),
    front: 'Gegenwart',
    back: 'Present',
  },
  {
    id: randomUUID(),
    front: 'Stunde',
    back: 'Hour',
  },
  {
    id: randomUUID(),
    front: 'Minute',
    back: 'Minute',
  },
  {
    id: randomUUID(),
    front: 'Sekunde',
    back: 'Second',
  },
  {
    id: randomUUID(),
    front: 'Vergangenheit',
    back: 'Past',
  },
  {
    id: randomUUID(),
    front: 'Zukunft',
    back: 'Future',
  },
]
