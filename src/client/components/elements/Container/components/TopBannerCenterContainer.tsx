import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const TopBannerCenterContainer = styled(Container)`
  @media (${viewportDevice.desktop}) {
    grid-area: nav;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
  
  @media (${viewportDevice.mobile}) {
    display: none;
  }
`
