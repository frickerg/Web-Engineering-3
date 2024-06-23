import styled from 'styled-components'
import { ChildrenProps } from '../types'

const StyledCenterHeader = styled.h2`
  padding: 10px;
`

export default function CenterHeader(props: Readonly<ChildrenProps>) {
  return <StyledCenterHeader>{props.children}</StyledCenterHeader>
}
