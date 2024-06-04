import './Ongoing.css'
import { useState, useEffect, useContext } from 'react'
import Button from '../../elements/Button/Button'
import { fetchFlashcards, validateAnswer } from '../../../../api/card'
import { GameContext, GameResultItem } from '../../../../api/GameContext'
import { GameState } from '../../../../api/GameState'
import { FlashcardProps } from '../../../../model/Card'
import Input from '../../elements/Input/Input'
import Flashcard from '../../elements/Flashcard/Flashcard'
import Label from '../../elements/Label/Label'

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

  const progressLabel = () => {
    const progress =
      cards.length > 0 ? Math.round((index / cards.length) * 100) : 0

    return `Progress: ${progress}%`
  }

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
    try {
      const result = await validateAnswer(currentCard.id, answer)
      const updatedCards = [...cards]

      updatedCards[currentCardIndex] = {
        ...currentCard,
        back: result.expectedAnswer,
        isAccepted: result.isAnswerCorrect,
        answer: answer,
      }

      dispatch({
        type: 'SET_CARDS',
        payload: updatedCards,
      })
    } catch (error) {
      console.error(error)
    }

    incrementIndex()
    setAnswer('')

    if (currentCardIndex >= cards.length - 1) {
      dispatch({
        type: 'FINISH_GAME',
      })
    }
  }

  return (
    <div className="ongoing-container">
      <div className="ongoing-header">
        <Label label={progressLabel()} className="progress-label" />
        <Button
          label="Delete Game"
          onClick={handleDeleteGame}
          className="delete-button"
        />
      </div>
      <Flashcard text={cards[index]?.front} />
      <div className="answer-section">
        <Input
          className="answer-input"
          value={answer}
          placeholder="Answer"
          handleInputChange={value => setAnswer(value)}
        />
        <Button
          label="Submit"
          onClick={validateCard}
          className="submit-button"
        />
      </div>
    </div>
  )
}
