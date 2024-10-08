import styled from 'styled-components'
import { Container } from '../Container'

export const GameResultsContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 20px;
  width: 95%;
`
