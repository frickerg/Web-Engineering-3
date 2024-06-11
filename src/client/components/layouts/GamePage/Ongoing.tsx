import { useState, useContext, useEffect } from 'react'
import QuizButton from '../../elements/Button/QuizButton'
import ProgressHeader from '../../typography/headings/ProgressHeader'
import ProgressLabel from '../../elements/Label/ProgressLabel'
import QuizAnswerContainer from '../../elements/Container/QuizAnswerContainer'
import QuizContainer from '../../elements/Container/QuizContainer'
import InputAnswer from '../../elements/Input/InputAnswer'
import Flashcard from '../../elements/Flashcard/Flashcard'
import { GameContext } from '../../../session/Context'
import { GameState } from '../../../../model/Game'
import { startNewGame } from '../../../session/helper'

export default function Ongoing() {
  const { state, dispatch } = useContext(GameContext)
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
    <QuizContainer>
      <ProgressHeader>
        <ProgressLabel label={progressLabel()} />
        <QuizButton label="Delete Game" onClick={handleDeleteGame} />
      </ProgressHeader>
      <Flashcard text={cards[index]?.front} />
      <QuizAnswerContainer>
        <InputAnswer
          value={answer}
          placeholder="Answer"
          handleInputChange={value => setAnswer(value)}
        />
        <QuizButton label="Submit" onClick={validateCard} />
      </QuizAnswerContainer>
    </QuizContainer>
  )
}
