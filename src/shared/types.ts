export type CardProps = {
  id: string
  front: string
  back: string
}

export type UserProps = {
  username: string
  role: string
  passwordHash: string
  salt: string
}
