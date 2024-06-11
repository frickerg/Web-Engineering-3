import styled from 'styled-components'

type CenterHeaderProps = {
  children: React.ReactNode
}

const StyledCenterHeader = styled.h2`
  margin: 10px;
`

export default function CenterHeader(props: Readonly<CenterHeaderProps>) {
  return <StyledCenterHeader>{props.children}</StyledCenterHeader>
}
