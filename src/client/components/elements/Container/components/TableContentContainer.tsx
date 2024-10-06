import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const TableContentContainer = styled(Container)`
  display: grid;
  /* grid-template-columns: 1fr 1fr 0.5fr 0.5fr; */
  overflow: auto;
  column-gap: 15px;
  padding: 15px 25px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border: none;
  }

  @media (${viewportDevice.mobile}) {
    grid-template-columns: 1fr 25%;
    grid-template-areas:
    'table-content-card table-content-button-edit'
    'table-content-card table-content-button-delete';
    /* grid-template-areas:
    'table-content-card-front table-content-button-edit'
    'table-content-card-back table-content-button-delete'; */
    padding: 1em 1em;
  }

  @media (${viewportDevice.desktop}) {
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
    padding: 1em 1.5em;
    grid-template-areas:
    'table-content-card table-content-button-edit'
    'table-content-card table-content-button-delete';
  }
`
