import styled from 'styled-components'

export default function BurgerMenu() {
  return (
    <MenuContainer>
      <BurgerButton>☰</BurgerButton>
    </MenuContainer>
  )
}

const MenuContainer = styled.div``

const BurgerButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
`
