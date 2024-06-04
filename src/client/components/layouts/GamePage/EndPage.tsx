// TODO man könnte Label anstelle von h2 und p verwenden

import Header2 from '../../typography/headings/Header2'
import TableHeader1 from '../../typography/headings/TableHeader1'
import Item from '../../typography/texts/Item'
import Paragraph from '../../typography/texts/Paragraph'
import { Fragment, useContext } from 'react'
import { GameContext } from '../../../../api/GameContext'
import Button from '../../elements/Button/Button'
import Container from '../../elements/Container/Container'
import { startNewGame } from '../../../../api/cardUtils'
import { CardContext } from '../../../../api/CardContext'
import styled from 'styled-components'

const EndPageButton = styled(Button)`
  width: auto;
  padding: 10px 20px;
  margin: 20px;
`

const EndPageResultsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const EndPageContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
  width: 95%;
`

export default function EndPage() {
  const { state: gameState, dispatch: gameDispatch } = useContext(GameContext)
  const { state: cardState } = useContext(CardContext)
  const { cards: gameCards } = gameState

  return (
    <EndPageResultsContainer className="end-page-results">
      <EndPageButton
        label="Start New Game"
        className="end-page-button"
        onClick={() => startNewGame(cardState.cards, gameDispatch)}
      />
      <Header2>Game Results</Header2>
      <Paragraph>
        Solved {gameCards.filter(card => card.isAccepted).length} out of{' '}
        {gameCards.length} correctly.
      </Paragraph>
      <EndPageContainer className="end-page-container">
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
      </EndPageContainer>
    </EndPageResultsContainer>
  )
}
