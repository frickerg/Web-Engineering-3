import './Ongoing.css'
import { useState, useEffect, useContext } from 'react'
import Button from '../../elements/Button/Button'
import { fetchFlashcards, validateAnswer } from '../../../../api/card'
import { GameContext, GameResultItem } from '../../../../api/GameContext'
import { useNavigate } from 'react-router-dom'
import { FlashcardProps } from '../../../../model/Card'
import Input from '../../elements/Input/Input'
import Flashcard from '../../elements/Flashcard/Flashcard'

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
  const { cards } = state
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const navigate = useNavigate()

  const progress =
    cards.length > 0 ? Math.round((index / cards.length) * 100) : 0

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

    fetchCards()
  }, [dispatch])

  const incrementIndex = () => {
    setIndex(prevIndex =>
      prevIndex < cards.length - 1 ? prevIndex + 1 : prevIndex
    )
  }

  const handleDeleteGame = () => {
    dispatch({ type: 'DELETE_GAME' })
    navigate('/')
  }

  const validateCard = async () => {
    const currentCard = cards[index]
    const result = await validateAnswer(currentCard.id, answer)
    const updatedCards = cards.map((card, i) =>
      i === index
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

    if (index >= cards.length - 1) {
      navigate('/end')
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
