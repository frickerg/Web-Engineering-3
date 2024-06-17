import { Link } from 'react-router-dom'
import { LinkProps } from '../types'
import styled from 'styled-components'

const StyledRouterLink = styled(Link)`
  color: lightblue;
  text-decoration: none;
  &:hover {
    color: #535bf2;
  }
`

export default function RouterLink(props: Readonly<LinkProps>) {
  return <StyledRouterLink to={props.to}>{props.children}</StyledRouterLink>
}
