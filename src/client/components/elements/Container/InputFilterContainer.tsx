import styled from 'styled-components'
import Container from './Container'

const InputFilterContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr 18%;
  grid-template-rows: auto auto;
  overflow: auto;
  column-gap: 15px;
  row-gap: 15px;
  padding: 15px 25px;
  align-items: center;
  grid-template-areas:
    'input-front input-back input-button'
    'spacer spacer input-checkbox';
`

export default InputFilterContainer
