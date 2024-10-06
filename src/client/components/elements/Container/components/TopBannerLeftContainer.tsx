import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const TopBannerLeftContainer = styled(Container)`
  @media (${viewportDevice.desktop}) {
    grid-area: head;
    display: flex;
    align-items: baseline;
  }
`
