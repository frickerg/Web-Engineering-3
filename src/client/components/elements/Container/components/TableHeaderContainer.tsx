import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const TableHeaderContainer = styled(Container)`
  /* grid-area: table-header-area; */
  display: grid;
  overflow: auto;
  column-gap: 1em;
  row-gap: 1em;
  align-items: center;
  padding-bottom: 0;

  @media (${viewportDevice.mobile}) {
    /* grid-template-columns: 1fr 1fr; */
    grid-template-columns: 1fr 25%;
    padding: 1em 0;
  }

  @media (${viewportDevice.desktop}) {
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
    padding: 1em 1.5em;
  }
`