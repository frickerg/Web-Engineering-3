import { Paragraph } from '../../typography/texts/Paragraph'
import { GameContainer } from '../../elements/Container/components/GameContainer'
import { StartButton } from '../../elements/Button/components/StartButton'
import { GameContext } from '../../../session/GameContext'
import { GameState, handleStartNewGame } from '../../../session/helper'
import { useContext } from 'react'
import { useAuthToken } from '../../../session/useAuthToken'

export default function StartNewGamePage() {
  const { state, dispatch } = useContext(GameContext)

  const isGameRunning = state.gameState === GameState.ONGOING
  const token = useAuthToken()

  return (
    <GameContainer>
      <StartButton onClick={() => handleStartNewGame(dispatch, token)}>
        Start New Game
      </StartButton>
      <Paragraph>
        {isGameRunning ? 'Continue Running Game' : 'No game running'}
      </Paragraph>
    </GameContainer>
  )
}
