// XXX: Logout-Button component for testing purposes
import { useContext } from 'react'
import { AuthContext } from '../client/session/AuthContext'

export default function LogoutButton() {
  const { logoutUser } = useContext(AuthContext)

  const handleLogout = () => {
    logoutUser()
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
