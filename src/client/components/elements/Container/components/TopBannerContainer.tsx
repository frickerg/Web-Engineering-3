import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const TopBannerContainer = styled(Container)`
  grid-area: topBanner;
  grid-template-areas: 'head nav navMenu';
  background-color: #182d4a;
  color: #fefefe;
  padding: 20px 15px;
  display: grid;
  align-items: center;

  @media (${viewportDevice.desktop}) {
    grid-template-areas: 'head nav navMenu';
    grid-template-columns: 1fr auto 1fr;
  }

  @media (${viewportDevice.mobile}) {
    grid-template-areas: 'head navMenu';
    grid-template-columns: 1fr auto;
  }
`
