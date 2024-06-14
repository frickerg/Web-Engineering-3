import styled from 'styled-components'
import { SimpleProps } from '../types'

const StyledCenterHeader = styled.h2`
  margin: 10px;
`

export default function CenterHeader(props: Readonly<SimpleProps>) {
  return <StyledCenterHeader>{props.children}</StyledCenterHeader>
}
