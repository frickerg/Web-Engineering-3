import Button from '../../elements/Button/Button'
import Container from '../../elements/Container/Container'
import { GameContext } from '../../../../api/GameContext'
import { GameState } from '../../../../api/GameState'
import { useContext } from 'react'
import { startNewGame } from '../../../../api/cardUtils'
import { CardContext } from '../../../../api/CardContext'
import styled from 'styled-components'

const NewPageButton = styled(Button)`
  width: auto;
  padding: 10px 20px;
  margin: 20px;
`

const NewPageContainer = styled(Container)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function NewPage() {
  const { state: gameState, dispatch: gameDispatch } = useContext(GameContext)
  const { state: cardState } = useContext(CardContext)

  return (
    <NewPageContainer className="new-page-container">
      <NewPageButton
        label="Start New Game"
        className="new-page-button"
        onClick={() => startNewGame(cardState.cards, gameDispatch)}
      />
      <p className="new-page-label">
        {gameState.gameState === GameState.ONGOING
          ? 'Continue Running Game'
          : 'No game running'}
      </p>
    </NewPageContainer>
  )
}
