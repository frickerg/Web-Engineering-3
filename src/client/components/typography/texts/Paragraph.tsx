import styled from 'styled-components'
import { SimpleProps } from '../types'

const StyledParagraph = styled.p`
  margin: 10px;
`

export default function Paragraph(props: Readonly<SimpleProps>) {
  return <StyledParagraph>{props.children}</StyledParagraph>
}
