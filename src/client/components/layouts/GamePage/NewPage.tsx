import Paragraph from '../../typography/texts/Paragraph'
import QuizContainer from '../../elements/Container/QuizContainer'
import StartButton from '../../elements/Button/StartButton'
import { GameContext } from '../../../../api/GameContext'
import { GameState } from '../../../../api/GameState'
import { useContext } from 'react'
import Button from '../../elements/Button/Button'
import { GameContext } from '../../../session/Context'
import { GameState } from '../../../../model/Game'
import { startNewGame } from '../../../session/helper'

export default function NewPage() {
  const { state, dispatch } = useContext(GameContext)
  const { storeCards: cards } = state
  const isGameRunning = state.gameState === GameState.ONGOING

  return (
    <QuizContainer>
      <StartButton
        label="Start New Game"
        onClick={() => startNewGame(cardState.cards, gameDispatch)}
      />
      <Paragraph>
        {gameState.gameState === GameState.ONGOING
          ? 'Continue Running Game'
          : 'No game running'}
      </Paragraph>
    </QuizContainer>
  )
}
