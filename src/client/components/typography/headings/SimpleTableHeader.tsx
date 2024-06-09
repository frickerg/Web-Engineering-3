import styled from 'styled-components'

type SimpleTableHeaderProps = {
  children: React.ReactNode
}

const StyledSimpleTableHeader = styled.h3`
  font-weight: bold;
  padding-top: 10;
  padding-bottom: 0;
`

function SimpleTableHeader(props: Readonly<SimpleTableHeaderProps>) {
  return <StyledSimpleTableHeader>{props.children}</StyledSimpleTableHeader>
}

export default SimpleTableHeader
