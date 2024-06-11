import styled from 'styled-components'

type ParagraphProps = {
  children: React.ReactNode
}

const StyledParagraph = styled.p`
  margin: 10px;
`

export default function Paragraph(props: Readonly<ParagraphProps>) {
  return <StyledParagraph>{props.children}</StyledParagraph>
}
