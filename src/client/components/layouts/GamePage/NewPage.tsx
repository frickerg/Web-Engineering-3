import './NewPage.css'
import Button from '../../elements/Button/Button'
import { GameContext, GameState } from '../../../../api/GameContext'
import { useContext } from 'react'

export default function NewPage() {
  const { state, dispatch } = useContext(GameContext)
  const { gameState } = state

  const startNewGame = async () => {
    dispatch({ type: 'START_GAME' })
  }

  return (
    <div className="new-page-container">
      <Button
        label="Start New Game"
        className="new-page-button"
        onClick={() => startNewGame()}
      />
      <p className="new-page-label">
        {gameState === GameState.ONGOING
          ? 'Continue Running Game'
          : 'No game running'}
      </p>
    </div>
  )
}
