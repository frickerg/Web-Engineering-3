import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const InputFilterContainer = styled(Container)`
  grid-area: input-filter-area;
  display: grid;
  grid-template-columns: 1fr 1fr 18%;
  grid-template-rows: auto auto;
  overflow: auto;
  column-gap: 1em;
  row-gap: 1em;
  align-items: center;

  @media (${viewportDevice.mobile}) {
    grid-template-areas:
    'input-front input-button'
    'input-back input-checkbox';
    grid-template-columns: 1fr 18%;
  }

  @media (${viewportDevice.desktop}) {
    grid-template-areas:
    'input-front input-back input-button'
    'spacer spacer input-checkbox';
    grid-template-columns: 1fr 1fr 18%;
  }
`
