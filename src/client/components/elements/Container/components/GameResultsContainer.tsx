import styled from 'styled-components'
import { StyledContainer } from '../Container'

const GameResultsContainer = styled(StyledContainer)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 20px;
  width: 95%;
`

export default GameResultsContainer
