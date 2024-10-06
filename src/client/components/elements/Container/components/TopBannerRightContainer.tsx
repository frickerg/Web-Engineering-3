import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const TopBannerRightContainer = styled(Container)`
  @media (${viewportDevice.desktop}) {
    grid-area: navMenu;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }
`