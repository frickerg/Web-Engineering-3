import { randomUUID } from 'crypto'
import type { CardProps } from '../../shared/CardProps'
import { UserStoreProps } from './entities/UserStore'

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

export const users: UserStoreProps[] = [
  {
    username: 'admin', // XXX password: admin-pw
    role: 'admin',
    passwordHash:
      '52ccb9076e35aaf8c0d778a8a4ce95c558ef47c3a0d23441c72c3ea2af2e8db156a36bd2cd039dfacde610037adef53e6deea12e09ecf4e304f8907ec9eddccb',
    salt: '65d8fd26dc63fd85d274dd028f39a49f',
  },
  {
    username: 'player', // XXX password: player-pw
    role: 'player',
    passwordHash:
      '5bc7845ebc00320fe2ab7c1dd2f65a08e3a4f8546a625aa99d304aebdb126ed7ead123682d116d1e28df25dff731de36e8b0425b4556c243b7efe2c5ed7743ce',
    salt: 'b98935b5571cb5aac91d8fcf725a382c',
  },
  {
    username: 'naruto', // XXX password: naruto-pw
    role: 'player',
    passwordHash:
      'cba711bc5473c7779f9da275bab2aa11c44a14a562c02a188b098577eb16eb085d96d4dfdd1c96f424a9672d76a36d382cc8eb8e499a8715df73cff7ce7762be',
    salt: '4b220e0716884eeabdd1d6afad1a4c0b',
  },
]
