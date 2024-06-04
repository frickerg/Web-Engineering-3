import { Link } from 'react-router-dom'
import styled from 'styled-components'

type TopBannerRouterLinkProps = {
  children: React.ReactNode;
  to: string;
}

// const StyledTopBannerRouterLink = styled(RouterLink)`
// `
const StyledTopBannerRouterLink = styled(Link)`
  color: lightblue;
  text-decoration: none;
  justify-self: end;
  &:hover {
    color: #535bf2;
  }
`

function TopBannerRouterLink(props: Readonly<TopBannerRouterLinkProps>) {
  return (
    <StyledTopBannerRouterLink to={props.to}>
      {props.children}
    </StyledTopBannerRouterLink>
  )
}

export default TopBannerRouterLink