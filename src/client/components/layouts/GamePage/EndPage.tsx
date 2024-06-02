// TODO man könnte Label anstelle von h2 und p verwenden

import './EndPage.css'
import { Fragment, useContext } from 'react'
import { GameContext } from '../../../../api/GameContext'
import Button from '../../elements/Button/Button'

export default function EndPage() {
  const { state: gameState, dispatch: gameDispatch } = useContext(GameContext)
  const { cards: gameCards } = gameState

  const startNewGame = async () => {
    gameDispatch({
      type: 'START_GAME',
    })
  }

  return (
    <div className="end-page-results">
      <Button
        label="Start New Game"
        className="end-page-button"
        onClick={() => startNewGame()}
      />
      <h2>Game Results</h2>
      <p>
        Solved {gameCards.filter(card => card.isAccepted).length} out of{' '}
        {gameCards.length} correctly.
      </p>
      <div className="end-page-container">
        <div className="end-page-header">Front</div>
        <div className="end-page-header">Back</div>
        <div className="end-page-header">Your Answer</div>
        <div className="end-page-header">Accepted</div>
        {gameCards.map(card => (
          <Fragment key={card.id}>
            <div className="end-page-item">{card.front}</div>
            <div className="end-page-item">{card.back}</div>
            <div className="end-page-item">{card.answer}</div>
            <div className="end-page-item">{card.isAccepted ? '✓' : '✗'}</div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
