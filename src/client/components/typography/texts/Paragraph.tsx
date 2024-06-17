import styled from 'styled-components'
import { ChildrenProps } from '../types'

const StyledParagraph = styled.p`
  margin: 10px;
`

export default function Paragraph(props: Readonly<ChildrenProps>) {
  return <StyledParagraph>{props.children}</StyledParagraph>
}
