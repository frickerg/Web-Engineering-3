import './NewPage.css'
import { useContext } from 'react'
import Button from '../../elements/Button/Button'
import { GameContext } from '../../../session/Context'
import { GameState } from '../../../../model/Game'
import { startNewGame } from '../../../session/startNewGame'

export default function NewPage() {
  const { state, dispatch } = useContext(GameContext)
  const { storeCards: cards } = state
  const isGameRunning = state.gameState === GameState.ONGOING

  return (
    <div className="new-page-container">
      <Button
        label="Start New Game"
        className="new-page-button"
        onClick={() => startNewGame(cards, dispatch)}
      />
      <p className="new-page-label">
        {isGameRunning ? 'Continue Running Game' : 'No game running'}
      </p>
    </div>
  )
}
