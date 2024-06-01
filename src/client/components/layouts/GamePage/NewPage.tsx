import './NewPage.css'
import Button from '../../elements/Button/Button'
import { useNavigate } from 'react-router-dom'
import { GameContext, GameState } from '../../../../api/GameContext'
import { useContext } from 'react'

export default function NewPage() {
  const { state, dispatch } = useContext(GameContext)
  const { gameState } = state

  const navigate = useNavigate()

  const startNewGame = async () => {
    dispatch({ type: 'DELETE_GAME' })
    navigate('/ongoing')
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
