import './Ongoing.css'
import { useState, useEffect, useContext } from 'react'
import Button from '../../elements/Button/Button'
import { fetchFlashcards, validateAnswer } from '../../../../api/card'
import {
  GameContext,
  GameResultItem,
  GameState,
} from '../../../../api/GameContext'
import { FlashcardProps } from '../../../../model/Card'

function mapCardToGameResultItem(cards: FlashcardProps[]): GameResultItem[] {
  return cards.map(card => ({
    id: card.id,
    front: card.query,
    back: '',
    answer: '',
    isAccepted: false,
  }))
}

export default function Ongoing() {
  const { state, dispatch } = useContext(GameContext)
  const { cards, gameState, currentCardIndex } = state
  const [answer, setAnswer] = useState('')

  const progress =
    cards.length > 0 ? Math.round((currentCardIndex / cards.length) * 100) : 0

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedCards = await fetchFlashcards()
        dispatch({
          type: 'SET_CARDS',
          payload: mapCardToGameResultItem(fetchedCards),
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (gameState === GameState.START) {
      fetchCards()
    }
  }, [dispatch, gameState])

  const incrementIndex = () => {
    const newIndex =
      currentCardIndex < cards.length - 1
        ? currentCardIndex + 1
        : currentCardIndex
    dispatch({
      type: 'SET_CARD_INDEX',
      payload: newIndex,
    })
  }

  const handleDeleteGame = () => {
    dispatch({ type: 'DELETE_GAME' })
  }

  const validateCard = async () => {
    if (!answer) {
      return
    }

    const currentCard = cards[currentCardIndex]
    const result = await validateAnswer(currentCard.id, answer)
    const updatedCards = cards.map((card, i) =>
      i === currentCardIndex
        ? {
            ...card,
            back: result.expectedAnswer,
            isAccepted: result.isAnswerCorrect,
            answer: answer,
          }
        : card
    )

    dispatch({
      type: 'SET_CARDS',
      payload: updatedCards,
    })

    incrementIndex()
    setAnswer('')

    if (currentCardIndex >= cards.length - 1) {
      dispatch({
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
          {cards.length > 0 && cards[currentCardIndex].front}
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
