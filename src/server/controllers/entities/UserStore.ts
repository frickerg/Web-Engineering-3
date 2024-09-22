import { UserProps } from '../../../shared/UserProps'
import { users } from '../data'

class UserStore {
  private users: UserProps[] = [...users]

  getUsers(): UserProps[] {
    return this.users
  }

  hasUser(username: string): boolean {
    return this.users.some(user => user.username === username)
  }

  findUserByUsername(username: string): UserProps | undefined {
    return this.users.find(user => user.username === username)
  }
}

export const userStore = new UserStore()
