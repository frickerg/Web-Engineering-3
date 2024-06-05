import { useState, useContext, useEffect } from 'react'
import QuizButton from '../../elements/Button/QuizButton'
import ProgressHeader from '../../typography/headings/ProgressHeader'
import { ProgressLabel as StyledProgressLabel } from '../../elements/Label/ProgressLabel'
import QuizAnswerContainer from '../../elements/Container/QuizAnswerContainer'
import QuizContainer from '../../elements/Container/QuizContainer'
import { GameContext } from '../../../../api/GameContext'
import { GameState } from '../../../../api/GameState'
import InputAnswer from '../../elements/Input/InputAnswer'
import Flashcard from '../../elements/Flashcard/Flashcard'
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
    <QuizContainer>
      <ProgressHeader>
        <StyledProgressLabel label={progressLabel()} />
        <QuizButton
          label="Delete Game"
          onClick={handleDeleteGame}
        />
      </ProgressHeader>
      <Flashcard text={gameCards[currentCardIndex]?.front} />
      <QuizAnswerContainer>
        <InputAnswer
          value={answer}
          placeholder="Answer"
          handleInputChange={value => setAnswer(value)}
        />
        <QuizButton
          label="Submit"
          onClick={validateCard}
        />
      </QuizAnswerContainer>
    </QuizContainer>
  )
}