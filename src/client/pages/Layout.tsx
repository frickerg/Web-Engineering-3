import { Outlet } from 'react-router-dom'
import Appbar from '../components/layouts/AppBar/Appbar'

export function Layout() {
  return (
    <div className="container">
      <Appbar />
      <Outlet />
    </div>
  )
}
