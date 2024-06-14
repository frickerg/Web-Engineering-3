import styled from 'styled-components'
import { SimpleProps } from '../types'

const StyledFilledTableHeader = styled.h3`
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
`

export default function FilledTableHeader(props: Readonly<SimpleProps>) {
  return <StyledFilledTableHeader>{props.children}</StyledFilledTableHeader>
}
