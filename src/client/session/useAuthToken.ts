import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export type Token = string | null

/**
 * useAuthToken: Liefert den Authentifizierungs-Token aus dem AuthContext.
 *
 * Der Hook ist zukunftssicher für mögliche Erweiterungen, wie z.B. Token-Renewal
 * oder das Handling von abgelaufenen Tokens.
 *
 * @returns {Token} Der aktuelle Token oder `null`.
 */
export const useAuthToken = (): Token => {
  const { state } = useContext(AuthContext)
  return state.user?.token ?? (null as Token)
}
