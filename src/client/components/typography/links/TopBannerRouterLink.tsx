import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledTopBannerRouterLink = styled(Link)`
  color: lightblue;
  text-decoration: none;
  justify-self: end;
  &:hover {
    color: #535bf2;
  }
`

export const TopBannerRouterLink = StyledTopBannerRouterLink
