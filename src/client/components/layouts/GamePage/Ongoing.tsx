import './Ongoing.css'
import { useState, useContext, useEffect } from 'react'
import Button from '../../elements/Button/Button'
import { GameContext } from '../../../../api/GameContext'
import { GameState } from '../../../../api/GameState'
import Input from '../../elements/Input/Input'
import Flashcard from '../../elements/Flashcard/Flashcard'
import Label from '../../elements/Label/Label'
import { CardContext } from '../../../../api/CardContext'
import { mapCardToGameResultItem } from '../../../../api/cardUtils'

export default function Ongoing() {
  const { state: gameState, dispatch: gameDispatch } = useContext(GameContext)
  const { state: cardState } = useContext(CardContext)
  const { cards: gameCards, currentCardIndex } = gameState
  const { cards: contextCards } = cardState
  const [answer, setAnswer] = useState('')

  const progressLabel = () => {
    const progress =
      gameCards.length > 0
        ? Math.round((currentCardIndex / gameCards.length) * 100)
        : 0

    return `Progress: ${progress}%`
  }

  useEffect(() => {
    if (
      gameState.gameState === GameState.NOT_STARTED &&
      gameCards.length === 0
    ) {
      gameDispatch({
        type: 'INIT_GAME',
        payload: mapCardToGameResultItem(contextCards),
      })
    }
  }, [gameDispatch, gameState.gameState, gameCards.length, contextCards])

  useEffect(() => {
    setAnswer('')
  }, [currentCardIndex])

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
    const currentCard = gameCards[currentCardIndex]
    if (!answer || !currentCard) {
      return
    }

    const isAnswerCorrect =
      currentCard.back.trim().toLowerCase() === answer.trim().toLowerCase()
    const updatedCards = [...gameCards]

    updatedCards[currentCardIndex] = {
      ...currentCard,
      back: currentCard.back,
      isAccepted: isAnswerCorrect,
      answer: answer,
    }

    gameDispatch({
      type: 'INIT_GAME',
      payload: updatedCards,
    })

    incrementIndex()
    setAnswer('')

    if (currentCardIndex >= gameCards.length - 1) {
      gameDispatch({
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
      <Flashcard text={gameCards[currentCardIndex]?.front} />
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
