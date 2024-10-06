import { useContext } from 'react'
import { AuthContext } from '../../../../session/AuthContext'
import { Button } from '../Button'
import styled from 'styled-components'
import { viewportDevice } from '../../../../themes/Breakpoints'

export default function LogoutButton() {
  const { logoutUser } = useContext(AuthContext)

  const handleLogout = () => {
    logoutUser()
  }

  return (
    <LogoutButtonWrapper onClick={handleLogout}>Log Out</LogoutButtonWrapper>
  )
}

const LogoutButtonWrapper = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  @media (${viewportDevice.mobile}) {
    color: #691c18;
    font-weight: bold;
  }
  @media (${viewportDevice.desktop}) {
    padding: 10px 20px;
    width: auto;
  }
`
