import { CenterHeader } from '../../typography/headings/CenterHeader'
import { FilledTableHeader } from '../../typography/headings/FilledTableHeader'
import { Item } from '../../typography/texts/Item'
import { ScoreLabel } from '../../elements/Label/components/ScoreLabel'
import { GameContainer } from '../../elements/Container/components/GameContainer'
import { GameResultsContainer } from '../../elements/Container/components/GameResultsContainer'
import { StartButton } from '../../elements/Button/components/StartButton'
import { Fragment, useContext, useEffect } from 'react'
import { GameContext } from '../../../session/GameContext'
import { handleStartNewGame } from '../../../session/helper'
import { fetchGameResults } from '../../../api'
import { useAuthToken } from '../../../session/useAuthToken'

export default function GameResultPage() {
  const { state, dispatch } = useContext(GameContext)
  const { results: cards } = state
  const token = useAuthToken()

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { results } = await fetchGameResults(token)
        dispatch({ type: 'SET_GAME_RESULTS', payload: results })
      } catch (error) {
        console.error('Error fetching game results:', error)
      }
    }

    fetchResults()
  }, [dispatch, token])

  const scoreLabel = () => {
    const score = cards.filter(card => card.isCorrect).length
    return `Solved ${score} out of ${cards.length} correctly.`
  }

  return (
    <GameContainer>
      <StartButton onClick={() => handleStartNewGame(dispatch, token)}>
        Start New Game
      </StartButton>
      <CenterHeader>Game Results</CenterHeader>
      <ScoreLabel>{scoreLabel()}</ScoreLabel>
      <GameResultsContainer>
        <FilledTableHeader>Front</FilledTableHeader>
        <FilledTableHeader>Back</FilledTableHeader>
        <FilledTableHeader>Your Answer</FilledTableHeader>
        <FilledTableHeader>Accepted</FilledTableHeader>
        {cards.map(card => (
          <Fragment key={card.id}>
            <Item>{card.front}</Item>
            <Item>{card.back}</Item>
            <Item>{card.answer}</Item>
            <Item>{card.isCorrect ? '✓' : '✗'}</Item>
          </Fragment>
        ))}
      </GameResultsContainer>
    </GameContainer>
  )
}
