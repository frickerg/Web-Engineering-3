import { useState, useContext, useEffect } from 'react'
import { GameButton } from '../../elements/Button/components/GameButton'
import { ProgressHeader } from '../../typography/headings/ProgressHeader'
import { ProgressLabel } from '../../elements/Label/components/ProgressLabel'
import { GameAnswerContainer } from '../../elements/Container/components/GameAnswerContainer'
import { GameContainer } from '../../elements/Container/components/GameContainer'
import { InputAnswer } from '../../elements/Input/components/InputAnswer'
import Flashcard from '../../elements/Flashcard/Flashcard'
import { GameContext } from '../../../session/GameContext'
import { deleteGame, submitAnswer } from '../../../api'
import { useAuthToken } from '../../../session/useAuthToken'

export default function OngoingGamePage() {
  const { state, dispatch } = useContext(GameContext)
  const { gameCards: cards, currentCardIndex: index, progress } = state
  const [answer, setAnswer] = useState('')
  const token = useAuthToken()

  const progressLabel = () => {
    return `Progress: ${progress}%`
  }

  useEffect(() => {
    setAnswer('')
  }, [index])

  const handleDeleteGame = async () => {
    try {
      await deleteGame(token)
      dispatch({ type: 'DELETE_GAME' })
    } catch (error) {
      console.error('Error deleting game:', error)
    }
  }

  const handleSubmitAnswer = async () => {
    const currentCard = cards[index]

    if (!currentCard || !currentCard.id || !currentCard.front) {
      console.warn('No valid card found to submit.')
      return
    }

    if (!answer.trim()) {
      console.warn('Answer is empty.')
      return
    }

    try {
      const { isCorrect, nextCard, progress } = await submitAnswer(
        currentCard.id,
        answer,
        token
      )

      dispatch({
        type: 'SUBMIT_GAME_ANSWER',
        payload: {
          ...currentCard,
          isCorrect,
          answer,
        },
      })

      if (nextCard.id) {
        dispatch({ type: 'SET_CARD_INDEX', payload: index + 1 })
        dispatch({ type: 'ADD_NEW_CARD', payload: nextCard })
      } else {
        dispatch({ type: 'FINISH_GAME' })
      }

      dispatch({ type: 'SET_PROGRESS', payload: progress })
    } catch (error) {
      console.error('Error submitting answer:', error)
    }
  }

  return (
    <GameContainer>
      <ProgressHeader>
        <ProgressLabel>{progressLabel()}</ProgressLabel>
        <GameButton onClick={handleDeleteGame}>Delete Game</GameButton>
      </ProgressHeader>
      <Flashcard text={cards[index]?.front} />
      <GameAnswerContainer>
        <InputAnswer
          value={answer}
          placeholder="Answer"
          onChange={e => setAnswer(e.target.value)}
        />
        <GameButton onClick={handleSubmitAnswer}>Submit</GameButton>
      </GameAnswerContainer>
    </GameContainer>
  )
}
