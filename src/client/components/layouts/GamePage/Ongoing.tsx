import './Ongoing.css'
import { useState, useContext, useEffect } from 'react'
import Button from '../../elements/Button/Button'
import { validateAnswer } from '../../../../api/card'
import { GameContext, GameResultItem } from '../../../../api/GameContext'
import { GameState } from '../../../../api/GameState'
import { CardContext } from '../../../../api/CardContext'
import { CardProps } from '../../elements/Card/Card'

function mapCardToGameResultItem(cards: CardProps[]): GameResultItem[] {
  return cards.map(card => ({
    id: card.id,
    front: card.front,
    back: '',
    answer: '',
    isAccepted: false,
  }))
}

export default function Ongoing() {
  const { state: gameState, dispatch: gameDispatch } = useContext(GameContext)
  const { state: cardState } = useContext(CardContext)
  const { cards: gameCards, currentCardIndex } = gameState
  const { cards: contextCards } = cardState
  const [answer, setAnswer] = useState('')

  const progress =
    gameCards.length > 0
      ? Math.round((currentCardIndex / gameCards.length) * 100)
      : 0

  useEffect(() => {
    if (gameState.gameState === GameState.START && gameCards.length === 0) {
      gameDispatch({
        type: 'SET_CARDS',
        payload: mapCardToGameResultItem(contextCards),
      })
    }
  }, [gameDispatch, gameState.gameState, gameCards.length, contextCards])

  const incrementIndex = () => {
    const newIndex =
      currentCardIndex < gameCards.length - 1
        ? currentCardIndex + 1
        : currentCardIndex
    gameDispatch({
      type: 'SET_CARD_INDEX',
      payload: newIndex,
    })
  }

  const handleDeleteGame = () => {
    gameDispatch({ type: 'DELETE_GAME' })
  }

  const validateCard = async () => {
    if (!answer) {
      return
    }

    const currentCard = gameCards[currentCardIndex]
    try {
      const result = await validateAnswer(currentCard.id, answer)
      const updatedCards = [...gameCards]

      updatedCards[currentCardIndex] = {
        ...currentCard,
        back: result.expectedAnswer,
        isAccepted: result.isAnswerCorrect,
        answer: answer,
      }

      gameDispatch({
        type: 'SET_CARDS',
        payload: updatedCards,
      })
    } catch (error) {
      console.error(error)
    }

    incrementIndex()
    setAnswer('')

    if (currentCardIndex >= gameCards.length - 1) {
      gameDispatch({
        type: 'FINISH_GAME',
      })
    }
  }

  return (
    <div className="ongoing-page">
      <div className="ongoing-header">
        <div className="ongoing-progress">Progress: {progress}%</div>
        <Button
          label="Delete Game"
          onClick={handleDeleteGame}
          className="ongoing-delete-button"
        />
      </div>
      <div className="ongoing-card">
        <div className="ongoing-card-content">
          {gameCards.length > 0 && gameCards[currentCardIndex].front}
        </div>
      </div>
      <div className="ongoing-answer-section">
        <input
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          className="ongoing-answer-input"
          placeholder="Answer"
        />
        <Button
          label="Submit"
          onClick={validateCard}
          className="ongoing-submit-button"
        />
      </div>
    </div>
  )
}
