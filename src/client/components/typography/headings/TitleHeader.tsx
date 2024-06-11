import styled from 'styled-components'

type TitleHeaderProps = {
  children: React.ReactNode
}

const StyledTitleHeader = styled.h1`
  font-weight: 500;
  font-size: 30px;
`

export default function TitleHeader(props: Readonly<TitleHeaderProps>) {
  return <StyledTitleHeader>{props.children}</StyledTitleHeader>
}
