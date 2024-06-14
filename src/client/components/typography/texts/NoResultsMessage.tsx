import styled from 'styled-components'
import { SimpleProps } from '../types'

const StyledNoResultsMessage = styled.p`
  color: #99b4c5;
  text-align: center;
  grid-column: 1 / span 3;
`

export default function NoResultsMessage(props: Readonly<SimpleProps>) {
  return <StyledNoResultsMessage>{props.children}</StyledNoResultsMessage>
}
