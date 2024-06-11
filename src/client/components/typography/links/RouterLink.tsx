import { Link } from 'react-router-dom'
import styled from 'styled-components'

type RouterLinkProps = {
  children: React.ReactNode
  to: string
}

const StyledRouterLink = styled(Link)`
  color: lightblue;
  text-decoration: none;
  &:hover {
    color: #535bf2;
  }
`

export default function RouterLink(props: Readonly<RouterLinkProps>) {
  return <StyledRouterLink to={props.to}>{props.children}</StyledRouterLink>
}
