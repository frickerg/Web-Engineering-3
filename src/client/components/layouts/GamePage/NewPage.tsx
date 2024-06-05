import Paragraph from '../../typography/texts/Paragraph'
import QuizContainer from '../../elements/Container/QuizContainer'
import StartButton from '../../elements/Button/StartButton'
import { GameContext } from '../../../session/Context'
import { GameState } from '../../../../model/Game'
import { startNewGame } from '../../../session/helper'
import { useContext } from 'react'

export default function NewPage() {
  const { state, dispatch } = useContext(GameContext)
  const { storeCards: cards } = state
  const isGameRunning = state.gameState === GameState.ONGOING

  return (
    <QuizContainer>
      <StartButton
        label="Start New Game"
        onClick={() => startNewGame(cards, dispatch)}
      />
      <Paragraph>
        {isGameRunning ? 'Continue Running Game' : 'No game running'}
      </Paragraph>
    </QuizContainer>
  )
}
