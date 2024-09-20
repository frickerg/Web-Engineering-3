import styled from 'styled-components'
import { ChildrenProps } from '../types'

export default function FilledTableHeader(props: Readonly<ChildrenProps>) {
  return <StyledFilledTableHeader>{props.children}</StyledFilledTableHeader>
}

const StyledFilledTableHeader = styled.h3`
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
`
