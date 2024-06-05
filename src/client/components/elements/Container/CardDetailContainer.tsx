import styled from 'styled-components'
import Container from './Container';

const CardDetailContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr 18%;
  grid-template-rows: auto auto;
  overflow: auto;
  column-gap: 15px;
  row-gap: 15px;
  padding: 15px 25px;
  align-items: center;
  grid-template-areas:
    'detail-label-front detail-label-back spacer'
    'detail-card-front detail-card-back detail-button';
`

export default CardDetailContainer