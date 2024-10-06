import { CenterHeader } from '../../typography/headings/CenterHeader'
import { FilledTableHeader } from '../../typography/headings/FilledTableHeader'
import { ScoreLabel } from '../../elements/Label/components/ScoreLabel'
import { StartButton } from '../../elements/Button/components/StartButton'
import { useContext, useEffect } from 'react'
import { GameContext } from '../../../session/GameContext'
import { handleStartNewGame } from '../../../session/helper'
import { fetchGameResults } from '../../../api'
import { useAuthToken } from '../../../session/useAuthToken'
import { Container } from '../../elements/Container/Container'
import { viewportDevice } from '../../../themes/Breakpoints'
import styled from 'styled-components'

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
        <TableHeaders>
          <FilledTableHeader>Front</FilledTableHeader>
          <FilledTableHeader>Back</FilledTableHeader>
          <FilledTableHeader>Your Answer</FilledTableHeader>
          <FilledTableHeader>Accepted</FilledTableHeader>
        </TableHeaders>
        {cards.map(card => (
          <Card key={card.id}>
            <CardItem>
              <Label>Front:</Label>
              <Content>{card.front}</Content>
            </CardItem>
            <CardItem>
              <Label>Back:</Label>
              <Content>{card.back}</Content>
            </CardItem>
            <CardItem>
              <Label>Your Answer:</Label>
              <Content>{card.answer}</Content>
            </CardItem>
            <CardItem>
              <Label>Accepted:</Label>
              <Content>{card.isCorrect ? '✓' : '✗'}</Content>
            </CardItem>
          </Card>
        ))}
      </GameResultsContainer>
    </GameContainer>
  )
}

const GameContainer = styled(Container)`
  display: grid;
  overflow: auto;
  padding: 0 1em;
  align-items: center;

  @media (${viewportDevice.desktop}) {
    grid-template-areas:
      'header-area'
      'flashcard-area'
      'answer-area';
    grid-template-columns: 1fr;
  }

  @media (${viewportDevice.mobile}) {
    grid-template-areas:
      'header-area'
      'flashcard-area'
      'answer-area';
    grid-template-columns: 1fr;
  }
`

const GameResultsContainer = styled.div`
  display: grid;
  gap: 1em;

  @media (${viewportDevice.desktop}) {
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
  }

  @media (${viewportDevice.mobile}) {
    grid-template-columns: 1fr;
  }
`

const TableHeaders = styled.div`
  display: none;

  @media (${viewportDevice.desktop}) {
    display: contents;

    ${FilledTableHeader} {
      text-align: center;
    }
  }
`

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1em;

  @media (${viewportDevice.desktop}) {
    display: contents;
    border: none;
    padding: 0;
  }
`

const CardItem = styled.div`
  margin-bottom: 0.5em;

  @media (${viewportDevice.desktop}) {
    margin-bottom: 0;
    text-align: center;
  }
`

const Label = styled.span`
  font-weight: bold;

  @media (${viewportDevice.desktop}) {
    display: none;
  }
`

const Content = styled.span`
  margin-left: 0.5em;
`
