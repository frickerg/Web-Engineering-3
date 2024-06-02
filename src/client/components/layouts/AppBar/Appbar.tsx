import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CenterButton from './CenterButton'
import Label from '../../elements/Label/Label'

function Appbar() {
  return (
    <AppbarContainer>
      <Title label="Mimir"></Title>
      <CenterButton />
      <StyledLink to="/cards">Manage Cards</StyledLink>
    </AppbarContainer>
  )
}

export default Appbar

const AppbarContainer = styled.div`
  background-color: #182d4a;
  color: #fefefe;
  padding: 20px 15px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`

const Title = styled(Label)`
  font-size: 30px;
  font-weight: lighter;
  color: inherit;
`

const StyledLink = styled(Link)`
  justify-self: end;
  color: inherit;
  text-decoration: none;
`
