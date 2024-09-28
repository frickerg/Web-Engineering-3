import { users } from '../data'
import { UserRole } from '../../../shared/UserRole'

export type UserStoreProps = {
  username: string
  role: UserRole
  passwordHash: string
  salt: string
}

class UserStore {
  private users: UserStoreProps[] = [...users]

  getUsers(): UserStoreProps[] {
    return this.users
  }

  hasUser(username: string): boolean {
    return this.users.some(user => user.username === username)
  }

  findUserByUsername(username: string): UserStoreProps | undefined {
    return this.users.find(user => user.username === username)
  }
}

export const userStore = new UserStore()
