import styled from 'styled-components'
import { ChildrenProps } from '../types'

const StyledSimpleTableHeader = styled.h3`
  padding-top: 10;
`

export default function SimpleTableHeader(props: Readonly<ChildrenProps>) {
  return <StyledSimpleTableHeader>{props.children}</StyledSimpleTableHeader>
}
