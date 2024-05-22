// TODO man könnte Label anstelle von h2 und p verwenden

import './GamePage.css'
import { Fragment, useContext } from 'react'
import { GameContext } from '../../../../api/GameContext'
import Button from '../../elements/Button/Button'

export default function End() {
  const { state } = useContext(GameContext)
  const { cards } = state

  return (
    <div className="game-page-results">
      <Button
        label="Start New Game"
        className="game-page-button"
        onClick={() => window.location.reload()}
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
