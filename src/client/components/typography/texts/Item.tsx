import styled from 'styled-components'

type ItemProps = {
  children: React.ReactNode
}

const StyledItem = styled.p`
  padding: 8px;
  border: 1px solid #ccc;
  text-align: center;
`

export default function Item(props: Readonly<ItemProps>) {
  return <StyledItem>{props.children}</StyledItem>
}
