import type { CardProps, UserProps } from '../../shared/types'
import { randomUUID } from 'crypto'

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

export const users: UserProps[] = [
  {
    username: 'admin',
    role: 'admin',
    passwordHash:
      '1bdc781712cd63a93aaf5b911e942f0427eacf8dd7e254e4f96c84ce297267828ac7003502397497f100ae4e6a21354297bf5590866bab0022149a05f7318a28',
    salt: '567298c3cb5feb7dab7326c1e2487e38',
  },
  {
    username: 'user',
    role: 'user',
    passwordHash:
      'e0f5f881d4123261ba7bf42d62ca26a211c348e8f204a7e981a12bc45b059f8a5f0bd5f0f3dba011917d4b02a51fe1636b67def2bf0aa1626214d986dd2b9804',
    salt: '17e9ea8be7a5081d0a0d65c1eda9fa97',
  },
]
