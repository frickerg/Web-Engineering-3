// TODO man könnte Label anstelle von h2 und p verwenden

import CenterHeader from '../../typography/headings/CenterHeader'
import FilledTableHeader from '../../typography/headings/FilledTableHeader'
import Item from '../../typography/texts/Item'
import { ScoreLabel as StyledScoreLabel } from '../../elements/Label/ScoreLabel'
import QuizContainer from '../../elements/Container/QuizContainer'
import QuizResultsContainer from '../../elements/Container/QuizResultsContainer'
import StartButton from '../../elements/Button/StartButton'
import { Fragment, useContext } from 'react'
import { GameContext } from '../../../../api/GameContext'
import { startNewGame } from '../../../../api/cardUtils'
import { CardContext } from '../../../../api/CardContext'

export default function EndPage() {
  const { state, dispatch } = useContext(GameContext)
  const { gameCards: cards } = state

  const scoreLabel = () => {
    const score = gameCards.filter(card => card.isAccepted).length
    return `Solved ${score} out of ${' '}${gameCards.length} correctly.`
  }

  return (
    <QuizContainer>
      <StartButton
        label="Start New Game"
        onClick={() => startNewGame(cardState.cards, gameDispatch)}
      />
      <CenterHeader>Game Results</CenterHeader>
      <StyledScoreLabel label={scoreLabel()}></StyledScoreLabel>
      <QuizResultsContainer>
        <FilledTableHeader>Front</FilledTableHeader>
        <FilledTableHeader>Back</FilledTableHeader>
        <FilledTableHeader>Your Answer</FilledTableHeader>
        <FilledTableHeader>Accepted</FilledTableHeader>
        {gameCards.map(card => (
          <Fragment key={card.id}>
            <Item>{card.front}</Item>
            <Item>{card.back}</Item>
            <Item>{card.answer}</Item>
            <Item>{card.isAccepted ? '✓' : '✗'}</Item>
          </Fragment>
        ))}
      </QuizResultsContainer>
    </QuizContainer>
  )
}
