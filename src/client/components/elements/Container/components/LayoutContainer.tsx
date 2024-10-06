import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const LayoutContainer = styled(Container)`
  grid-area: mainContent;
  min-height: 100vh;
  background-color: #f9f9f9;

  @media (${viewportDevice.mobile}) {
    grid-template-columns: 1fr auto;
  }
`
