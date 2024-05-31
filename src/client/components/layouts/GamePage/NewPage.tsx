import './NewPage.css'
import Button from '../../elements/Button/Button'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../../../../api/GameContext'
import { useContext } from 'react'

export default function New() {
  const { state, dispatch } = useContext(GameContext)
  const { isGameOngoing } = state

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
        {isGameOngoing ? 'Continue Running Game' : 'No Running Game'}
      </p>
    </div>
  )
}
