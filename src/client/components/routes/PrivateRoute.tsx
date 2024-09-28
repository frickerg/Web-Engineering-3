import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../session/AuthContext'
import { UserRole } from '../../../shared/UserRole'

const PrivateRoute = ({ role }: { role?: UserRole }) => {
  const { state: authState } = useContext(AuthContext)

  if (!authState.user) {
    return <Navigate to="/login" />
  }

  if (role && authState.user.role !== role) {
    return <Navigate to="/accessDenied" />
  }

  return <Outlet />
}

export default PrivateRoute
