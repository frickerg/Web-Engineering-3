import styled from 'styled-components'
import { ChildrenProps } from '../types'

export default function Item(props: Readonly<ChildrenProps>) {
  return <StyledItem>{props.children}</StyledItem>
}

const StyledItem = styled.p`
  padding: 8px;
  border: 1px solid #ccc;
  text-align: center;
`
