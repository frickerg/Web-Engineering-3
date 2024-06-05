import styled from 'styled-components'
import Container from './Container';

const TableContentContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
  overflow: auto;
  column-gap: 15px;
  padding: 15px 25px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border: none;
  }
`

export default TableContentContainer