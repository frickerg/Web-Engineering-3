import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const CardDetailContainer = styled(Container)`
  display: grid;
  overflow: auto;
  column-gap: 1em;
  row-gap: 1em;
  padding: 1em 1.5em;
  align-items: center;

  @media (${viewportDevice.desktop}) {
    grid-template-areas:
      'detail-label-front detail-label-back spacer'
      'detail-card-front detail-card-back detail-button';
    grid-template-columns: 1fr 1fr 18%;
  }

  //TODO: 1 column okay, aber lieber react icons - andere Ansichten weinen sonst
  @media (${viewportDevice.mobile}) {
    grid-template-areas:
      'detail-label-front'
      'detail-card-front'
      'detail-label-back'
      'detail-card-back'
      'detail-button';
    grid-template-columns: 1fr;
  }
`
