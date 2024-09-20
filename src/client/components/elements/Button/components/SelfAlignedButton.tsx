import StyledButton from '../Button'
import styled from 'styled-components'

const SelfAlignedButton = styled(StyledButton)`
  grid-area: detail-button;
  align-self: last baseline;
`

export default SelfAlignedButton
