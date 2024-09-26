import { Paragraph } from '../../typography/texts/Paragraph'
import { GameContainer } from '../../elements/Container/components/GameContainer'
import { StartButton } from '../../elements/Button/components/StartButton'
import { GameContext } from '../../../session/Context'
import { GameState, startNewGame } from '../../../session/helper'
import { useContext } from 'react'

export default function StartNewGamePage() {
  const { state, dispatch } = useContext(GameContext)
  const { storeCards: cards } = state
  const isGameRunning = state.gameState === GameState.ONGOING

  return (
    <GameContainer>
      <StartButton onClick={() => startNewGame(cards, dispatch)}>
        Start New Game
      </StartButton>
      <Paragraph>
        {isGameRunning ? 'Continue Running Game' : 'No game running'}
      </Paragraph>
    </GameContainer>
  )
}
