import styled from 'styled-components'
import { ChildrenProps } from '../types'

export default function Paragraph(props: Readonly<ChildrenProps>) {
  return <StyledParagraph>{props.children}</StyledParagraph>
}

const StyledParagraph = styled.p`
  margin: 10px;
`
