import styled from 'styled-components'
import { ChildrenProps } from '../types'

export default function TitleHeader(props: Readonly<ChildrenProps>) {
  return <StyledTitleHeader>{props.children}</StyledTitleHeader>
}

const StyledTitleHeader = styled.h1`
  font-weight: 500;
  font-size: 30px;
`
