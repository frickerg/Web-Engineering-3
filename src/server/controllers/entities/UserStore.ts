import { UserProps } from '../../../shared/types'
import { users as StaticUsers } from '../data'

class UserStore {
  private users: UserProps[] = [...StaticUsers]

  getUsers(): UserProps[] {
    return this.users
  }

  hasUser(username: string): boolean {
    return this.users.some(user => user.username === username)
  }

  // addUser(user: UserProps): void {
  //   this.users.push(user)
  // }

  // deleteUser(username: string): void {
  //   this.users = this.users.filter(user => user.username !== username)
  // }
}

export const userStore = new UserStore()
