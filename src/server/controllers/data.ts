import type { CardProps } from '../../shared/types'
import { randomUUID } from 'crypto'

const cards: CardProps[] = [
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

export default cards
