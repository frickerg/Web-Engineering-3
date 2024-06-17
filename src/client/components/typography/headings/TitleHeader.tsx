import styled from 'styled-components'
import { SimpleProps } from '../types'

const StyledTitleHeader = styled.h1`
  font-weight: 500;
  font-size: 30px;
`

export default function TitleHeader(props: Readonly<SimpleProps>) {
  return <StyledTitleHeader>{props.children}</StyledTitleHeader>
}
