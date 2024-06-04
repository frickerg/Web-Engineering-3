import { useState, useContext, useEffect } from 'react'
import Button from '../../elements/Button/Button'
import Container from '../../elements/Container/Container'
import ProgressHeader from '../../typography/headings/ProgressHeader'
import { GameContext } from '../../../../api/GameContext'
import { GameState } from '../../../../api/GameState'
import Input from '../../elements/Input/Input'
import Flashcard from '../../elements/Flashcard/Flashcard'
import Label from '../../elements/Label/Label'
import { CardContext } from '../../../../api/CardContext'
import { mapCardToGameResultItem } from '../../../../api/cardUtils'
import styled from 'styled-components'

const OngoingButton = styled(Button)`
  width: auto;
  padding: 10px 20px;
`

const OngoingContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const OngoingAnswerSection = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 500px;
`

const OngoingProgressLabel = styled(Label)`
  font-size: 24px;
  font-weight: bold;
`

const OngoingAnswerInput = styled(Input)`
  margin-right: 20px;
`

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
    <OngoingContainer className="ongoing-container">
      <ProgressHeader>
        <OngoingProgressLabel label={progressLabel()} className="progress-label" />
        <OngoingButton
          label="Delete Game"
          onClick={handleDeleteGame}
          className="delete-button"
        />
      </ProgressHeader>
      <Flashcard text={gameCards[currentCardIndex]?.front} />
      <OngoingAnswerSection className="answer-section">
        <OngoingAnswerInput
          className="answer-input"
          value={answer}
          placeholder="Answer"
          handleInputChange={value => setAnswer(value)}
        />
        <OngoingButton
          label="Submit"
          onClick={validateCard}
          className="submit-button"
        />
      </OngoingAnswerSection>
    </OngoingContainer>
  )
}
