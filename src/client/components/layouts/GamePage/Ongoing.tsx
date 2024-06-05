import './Ongoing.css'
import { useState, useContext, useEffect } from 'react'
import Button from '../../elements/Button/Button'
import { GameContext } from '../../../session/Context'
import { GameState } from '../../../../model/Game'
import Input from '../../elements/Input/Input'
import Flashcard from '../../elements/Flashcard/Flashcard'
import Label from '../../elements/Label/Label'
import { startNewGame } from '../../../session/helper'

export default function Ongoing() {
  const { state: state, dispatch } = useContext(GameContext)
  const { gameCards: cards, currentCardIndex: index } = state
  const [answer, setAnswer] = useState('')

  const progressLabel = () => {
    const progress =
      cards.length > 0 ? Math.round((index / cards.length) * 100) : 0
    return `Progress: ${progress}%`
  }

  useEffect(() => {
    if (state.gameState === GameState.NOT_STARTED && cards.length === 0) {
      startNewGame(cards, dispatch)
    }
  }, [dispatch, state.gameState, cards.length, cards])

  useEffect(() => {
    setAnswer('')
  }, [index])

  const incrementIndex = () => {
    const newIndex = index < cards.length - 1 ? index + 1 : index
    dispatch({
      type: 'SET_CARD_INDEX',
      payload: newIndex,
    })
  }

  const handleDeleteGame = () => {
    dispatch({ type: 'DELETE_GAME' })
  }

  const validateCard = async () => {
    const currentCard = cards[index]
    if (!answer || !currentCard) {
      return
    }

    const isAnswerCorrect =
      currentCard.back.trim().toLowerCase() === answer.trim().toLowerCase()
    const updatedCards = [...cards]

    updatedCards[index] = {
      ...currentCard,
      back: currentCard.back,
      isAccepted: isAnswerCorrect,
      answer: answer,
    }

    dispatch({
      type: 'INIT_GAME',
      payload: updatedCards,
    })

    incrementIndex()
    setAnswer('')

    if (index >= cards.length - 1) {
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
