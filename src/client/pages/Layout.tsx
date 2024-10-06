import { Outlet } from 'react-router-dom'
import Appbar from '../components/layouts/AppBar/Appbar'
import { LayoutContainer } from '../components/elements/Container/components/LayoutContainer'

export default function Layout() {
  return (
    <LayoutContainer>
      <Appbar />
      <Outlet />
    </LayoutContainer>
  )
}
