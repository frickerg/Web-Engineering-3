import styled from 'styled-components'
import { Container } from '../Container'

export const ManageCardsContainer = styled(Container)`
  display: grid;
  overflow: auto;
  padding: 0 1em;
  align-items: center;
  grid-template-areas:
    'input-filter-area'
    'table-header-area'
    'table-content-area';
  grid-template-columns: 1fr;
`
