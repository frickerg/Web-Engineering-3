import styled from 'styled-components'
import { ChildrenProps } from '../types'

const StyledNoResultsMessage = styled.p`
  color: #99b4c5;
  text-align: center;
  grid-column: 1 / span 3;
`

export default function NoResultsMessage(props: Readonly<ChildrenProps>) {
  return <StyledNoResultsMessage>{props.children}</StyledNoResultsMessage>
}
