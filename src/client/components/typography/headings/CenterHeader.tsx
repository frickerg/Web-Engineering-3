import styled from 'styled-components'
import { ChildrenProps } from '../types'

export default function CenterHeader(props: Readonly<ChildrenProps>) {
  return <StyledCenterHeader>{props.children}</StyledCenterHeader>
}

const StyledCenterHeader = styled.h2`
  padding: 10px;
`
