import { viewportDevice } from '../../../../themes/Breakpoints'
import { GameButton } from './GameButton'
import styled from 'styled-components'

export const StartButton = styled(GameButton)`
  @media (${viewportDevice.desktop}) {
    margin: 1.5em;
    max-width: 20vw;
  }

  @media (${viewportDevice.mobile}) {
    margin-top: 1em;
  }
`
