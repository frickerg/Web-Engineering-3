import Paragraph from '../../typography/texts/Paragraph'
import QuizContainer from '../../elements/Container/QuizContainer'
import StartButton from '../../elements/Button/StartButton'
import { GameContext } from '../../../../api/GameContext'
import { GameState } from '../../../../api/GameState'
import { useContext } from 'react'
import { startNewGame } from '../../../../api/cardUtils'
import { CardContext } from '../../../../api/CardContext'

export default function NewPage() {
  const { state: gameState, dispatch: gameDispatch } = useContext(GameContext)
  const { state: cardState } = useContext(CardContext)

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
