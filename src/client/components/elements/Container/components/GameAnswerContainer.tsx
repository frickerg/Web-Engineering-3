import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const GameAnswerContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 500px;

  @media (${viewportDevice.mobile}) {
    width: 60%;
    padding: 2em 0;
    height: auto;
    margin: 20px;
    font-size: 20px;
  }
`
