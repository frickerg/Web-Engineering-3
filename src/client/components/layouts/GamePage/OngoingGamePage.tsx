import { useState, useContext, useEffect } from 'react'
import GameButton from '../../elements/Button/components/GameButton'
import ProgressHeader from '../../typography/headings/ProgressHeader'
import ProgressLabel from '../../elements/Label/components/ProgressLabel'
import GameAnswerContainer from '../../elements/Container/components/GameAnswerContainer'
import GameContainer from '../../elements/Container/components/GameContainer'
import InputAnswer from '../../elements/Input/components/InputAnswer'
import Flashcard from '../../elements/Flashcard/Flashcard'
import { GameContext } from '../../../session/Context'
import { GameState, startNewGame } from '../../../session/helper'
import { CardProps } from '../../../../shared/types'

export default function OngoingGamePage() {
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
  }, [state.gameState, cards, dispatch])

  useEffect(() => {
    setAnswer('')
  }, [index])

  const handleDeleteGame = () => dispatch({ type: 'DELETE_GAME' })

  const validateCard = () => {
    const currentCard = cards[index]
    if (!answer || !currentCard) {
      return
    }

    dispatch({
      type: 'SUBMIT_GAME_ANSWER',
      payload: {
        ...currentCard,
        isAccepted: isAnswerCorrect(currentCard, answer),
        answer,
      },
    })

    dispatch({ type: 'SET_CARD_INDEX', payload: getNewIndex() })

    if (index >= cards.length - 1) {
      dispatch({ type: 'FINISH_GAME' })
    }
  }

  const isAnswerCorrect = (card: CardProps, answer: string) => {
    return card.back.trim().toLowerCase() === answer.trim().toLowerCase()
  }

  const getNewIndex = () => {
    return index < cards.length - 1 ? index + 1 : index
  }

  return (
    <GameContainer>
      <ProgressHeader>
        <ProgressLabel label={progressLabel()} />
        <GameButton label="Delete Game" onClick={handleDeleteGame} />
      </ProgressHeader>
      <Flashcard text={cards[index]?.front} />
      <GameAnswerContainer>
        <InputAnswer
          value={answer}
          placeholder="Answer"
          handleInputChange={setAnswer}
        />
        <GameButton label="Submit" onClick={validateCard} />
      </GameAnswerContainer>
    </GameContainer>
  )
}
