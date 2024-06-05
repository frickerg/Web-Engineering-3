// TODO man könnte Label anstelle von h2 und p verwenden

import './EndPage.css'
import { Fragment, useContext } from 'react'
import { GameContext } from '../../../session/Context'
import Button from '../../elements/Button/Button'
import { startNewGame } from '../../../session/helper'

export default function EndPage() {
  const { state, dispatch } = useContext(GameContext)
  const { gameCards: cards } = state

  const solvedCount = cards.filter(card => card.isAccepted).length

  return (
    <div className="end-page-results">
      <Button
        label="Start New Game"
        className="end-page-button"
        onClick={() => startNewGame(cards, dispatch)}
      />
      <h2>Game Results</h2>
      <p>
        Solved {solvedCount} out of {cards.length} correctly.
      </p>
      <div className="end-page-container">
        <div className="end-page-header">Front</div>
        <div className="end-page-header">Back</div>
        <div className="end-page-header">Your Answer</div>
        <div className="end-page-header">Accepted</div>
        {cards.map(card => (
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
