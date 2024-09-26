import { login } from '../api/index'
import { LoginResponse } from './LoginResponse'

export const loginUserService = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  return await login(username, password)
}

export const logoutUserService = () => {}
