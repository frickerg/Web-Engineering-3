import { Paragraph } from '../../typography/texts/Paragraph'
import { GameContainer } from '../../elements/Container/components/GameContainer'
import { StartButton } from '../../elements/Button/components/StartButton'
import { GameContext } from '../../../session/GameContext'
import { handleStartNewGame } from '../../../session/helper'
import { useContext, useEffect } from 'react'
import { useAuthToken } from '../../../session/useAuthToken'
import { GameState } from '../../../../shared/GameState'

export default function StartNewGamePage() {
  const { state, dispatch } = useContext(GameContext)
  const token = useAuthToken()
  const isGameRunning = state.gameState === GameState.ONGOING

  useEffect(() => {}, [isGameRunning])

  return (
    <GameContainer>
      <StartButton onClick={() => handleStartNewGame(dispatch, token)}>
        {isGameRunning ? 'Continue Game' : 'Start New Game'}
      </StartButton>
      <Paragraph>
        {isGameRunning
          ? 'You have an ongoing game. Continue playing!'
          : 'No game running'}
      </Paragraph>
    </GameContainer>
  )
}
