import { useState } from 'react'
import { styled } from 'styled-components'
import FullscreenNav from '../../../layouts/AppBar/FullscreenMobileMenu'

export const BurgerButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  function setMenuIcon() {
    return isOpen === false ? '☰' : '✕'
  }

  return (
    <BurgerButtonWrapper onClick={handleClick}>
      {setMenuIcon()}
      {isOpen ? <FullscreenNav /> : null}
    </BurgerButtonWrapper>
  )
}

const BurgerButtonWrapper = styled.div`
  background: none;
  border: none;
  font-size: 30px;
  color: #fefefe;
`
