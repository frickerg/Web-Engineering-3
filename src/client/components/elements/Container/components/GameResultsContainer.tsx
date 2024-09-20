import styled from 'styled-components'
import Container from '../Container'

const GameResultsContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 20px;
  width: 95%;
`

export default GameResultsContainer
