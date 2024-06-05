// TODO man könnte Label anstelle von h2 und p verwenden

import Header2 from '../../typography/headings/Header2'
import TableHeader1 from '../../typography/headings/TableHeader1'
import Item from '../../typography/texts/Item'
import Paragraph from '../../typography/texts/Paragraph'
import QuizContainer from '../../elements/Container/QuizContainer'
import QuizResultsContainer from '../../elements/Container/QuizResultsContainer'
import StartButton from '../../elements/Button/StartButton'
import { Fragment, useContext } from 'react'
import { GameContext } from '../../../../api/GameContext'
import { startNewGame } from '../../../../api/cardUtils'
import { CardContext } from '../../../../api/CardContext'

export default function EndPage() {
  const { state: gameState, dispatch: gameDispatch } = useContext(GameContext)
  const { state: cardState } = useContext(CardContext)
  const { cards: gameCards } = gameState

  return (
    <QuizContainer>
      <StartButton
        label="Start New Game"
        onClick={() => startNewGame(cardState.cards, gameDispatch)}
      />
      <Header2>Game Results</Header2>
      <Paragraph>
        Solved {gameCards.filter(card => card.isAccepted).length} out of{' '}
        {gameCards.length} correctly.
      </Paragraph>
      <QuizResultsContainer>
        <TableHeader1>Front</TableHeader1>
        <TableHeader1>Back</TableHeader1>
        <TableHeader1>Your Answer</TableHeader1>
        <TableHeader1>Accepted</TableHeader1>
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
