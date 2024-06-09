import styled from 'styled-components'

type NoResultsMessageProps = {
  children: React.ReactNode
}

const StyledNoResultsMessage = styled.p`
  color: #99b4c5;
  text-align: center;
  grid-column: 1 / span 3;
`

function NoResultsMessage(props: Readonly<NoResultsMessageProps>) {
  return <StyledNoResultsMessage>{props.children}</StyledNoResultsMessage>
}

export default NoResultsMessage
