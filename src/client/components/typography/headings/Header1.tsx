import styled from 'styled-components'

type Header1Props = {
  children: React.ReactNode;
}

const StyledHeader1 = styled.h1`
  font-weight: 500;
  font-size: 30px;
`

function Header1(props: Readonly<Header1Props>) {
  return (
    <StyledHeader1>
      {props.children}
    </StyledHeader1>
  )
}

export default Header1
