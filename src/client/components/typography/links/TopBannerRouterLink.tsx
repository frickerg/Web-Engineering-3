import { Link } from 'react-router-dom'
import { LinkProps } from '../types'
import styled from 'styled-components'

export default function TopBannerRouterLink(props: Readonly<LinkProps>) {
  return (
    <StyledTopBannerRouterLink to={props.to}>
      {props.children}
    </StyledTopBannerRouterLink>
  )
}

const StyledTopBannerRouterLink = styled(Link)`
  color: lightblue;
  text-decoration: none;
  justify-self: end;
  &:hover {
    color: #535bf2;
  }
`
