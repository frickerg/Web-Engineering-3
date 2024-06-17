import styled from 'styled-components'
import { ChildrenProps } from '../types'

const StyledSimpleTableHeader = styled.h3`
  font-weight: bold;
  padding-top: 10;
  padding-bottom: 0;
`

export default function SimpleTableHeader(props: Readonly<ChildrenProps>) {
  return <StyledSimpleTableHeader>{props.children}</StyledSimpleTableHeader>
}
