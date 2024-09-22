export type UserProps = {
  username: string
  role: 'admin' | 'player'
  passwordHash: string
  salt: string
}
