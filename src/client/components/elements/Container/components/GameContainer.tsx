import styled from 'styled-components'
import { Container } from '../Container'
import { viewportDevice } from '../../../../themes/Breakpoints'

export const GameContainer = styled(Container)`
  display: grid;
  overflow: auto;
  padding: 0 1em;
  align-items: center;
  grid-template-areas:
    'header-area .'
    'flashcard-area .'
    'answer-area .'
    'delete-area .';
  grid-template-columns: 1fr;

  @media (${viewportDevice.desktop}) {
    grid-template-areas:
      'header-area .'
      'flashcard-area .'
      'answer-area .'
      'delete-area .';
    grid-template-columns: 1fr;
  }

  @media (${viewportDevice.mobile}) {
    grid-template-areas:
      'header-area .'
      'flashcard-area .'
      'answer-area .'
      'delete-area .';
    grid-template-columns: 1fr;
  }
`
