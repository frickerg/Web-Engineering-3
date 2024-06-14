import styled from 'styled-components'
import { SimpleProps } from '../types'

const StyledSimpleTableHeader = styled.h3`
  font-weight: bold;
  padding-top: 10;
  padding-bottom: 0;
`

export default function SimpleTableHeader(props: Readonly<SimpleProps>) {
  return <StyledSimpleTableHeader>{props.children}</StyledSimpleTableHeader>
}
