import Paragraph from '../../typography/texts/Paragraph'
import GameContainer from '../../elements/Container/GameContainer'
import StartButton from '../../elements/Button/StartButton'
import { GameContext } from '../../../session/Context'
import { GameState, startNewGame } from '../../../session/helper'
import { useContext } from 'react'

export default function StartNewGamePage() {
  const { state, dispatch } = useContext(GameContext)
  const { storeCards: cards } = state
  const isGameRunning = state.gameState === GameState.ONGOING

  return (
    <GameContainer>
      <StartButton
        label="Start New Game"
        onClick={() => startNewGame(cards, dispatch)}
      />
      <Paragraph>
        {isGameRunning ? 'Continue Running Game' : 'No game running'}
      </Paragraph>
    </GameContainer>
  )
}
