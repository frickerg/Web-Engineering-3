import styled from 'styled-components'

type ParagraphProps = {
  children: React.ReactNode
}

const StyledParagraph = styled.p`
  margin: 10px;
`

function Paragraph(props: Readonly<ParagraphProps>) {
  return <StyledParagraph>{props.children}</StyledParagraph>
}

export default Paragraph
