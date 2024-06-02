import './NewPage.css'
import Button from '../../elements/Button/Button'
import { GameContext } from '../../../../api/GameContext'
import { GameState } from '../../../../api/GameState'
import { useContext } from 'react'

export default function NewPage() {
  const { state: gameState, dispatch: gameDispatch } = useContext(GameContext)

  const startNewGame = async () => {
    gameDispatch({
      type: 'START_GAME',
    })
  }

  return (
    <div className="new-page-container">
      <Button
        label="Start New Game"
        className="new-page-button"
        onClick={() => startNewGame()}
      />
      <p className="new-page-label">
        {gameState.gameState === GameState.ONGOING
          ? 'Continue Running Game'
          : 'No game running'}
      </p>
    </div>
  )
}
