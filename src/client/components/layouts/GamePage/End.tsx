// TODO man könnte Label anstelle von h2 und p verwenden

import './GamePage.css'
import { Fragment, useContext } from 'react'
import { GameContext } from '../../../../api/GameContext'
import Button from '../../elements/Button/Button'
import { useNavigate } from 'react-router-dom'

export default function End() {
  const { state, dispatch } = useContext(GameContext)
  const { cards } = state
  const navigate = useNavigate()

  const startNewGame = async () => {
    dispatch({ type: 'DELETE_GAME' })
    navigate('/new')
  }

  return (
    <div className="game-page-results">
      <Button
        label="Start New Game"
        className="game-page-button"
        onClick={() => startNewGame()}
      />
      <h2>Game Results</h2>
      <p>
        Solved {cards.filter(card => card.accepted).length} out of{' '}
        {cards.length} correctly.
      </p>
      <div className="game-page-container">
        <div className="game-page-header">Front</div>
        <div className="game-page-header">Back</div>
        <div className="game-page-header">Your Answer</div>
        <div className="game-page-header">Accepted</div>
        {cards.map(card => (
          <Fragment key={card.id}>
            <div className="game-page-item">{card.front}</div>
            <div className="game-page-item">{card.back}</div>
            <div className="game-page-item">{card.answer}</div>
            <div className="game-page-item">{card.accepted ? '✓' : '✗'}</div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
