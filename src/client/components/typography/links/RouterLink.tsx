import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledRouterLink = styled(Link)`
  color: lightblue;
  text-decoration: none;
  &:hover {
    color: #535bf2;
  }
`

export const RouterLink = StyledRouterLink
