import styled from 'styled-components'

type Header2Props = {
  children: React.ReactNode;
}

const StyledHeader2 = styled.h2`
  margin: 10px;
`

function Header2(props: Readonly<Header2Props>) {
  return (
    <StyledHeader2>
      {props.children}
    </StyledHeader2>
  )
}

export default Header2