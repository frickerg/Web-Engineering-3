import NoResultsMessage from '../../typography/texts/NoResultsMessage'
import Button from '../../elements/Button/Button'
import Card, { CardProps } from '../../elements/Card/Card'
import Container from '../../elements/Container/Container'
import RouterLink from '../../typography/links/RouterLink'
import styled from 'styled-components'

type CardRowsProps = {
  cards: CardProps[]
  handleDeleteById: (id: string) => void
}

const CardRowContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
  overflow: auto;
  column-gap: 15px;
  padding: 15px 25px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border: none;
  }
`

function CardRows(props: CardRowsProps) {
  return props.cards.length ? (
    props.cards.map(card => (
      <CardRowContainer className="card-container" key={card.id}>
        <Card id={card.id} front={card.front} back={card.back} />
        <RouterLink to={`details/${card.id}`}>
          <Button label="Edit"></Button>
        </RouterLink>
        <Button
          label="Delete"
          onClick={() => props.handleDeleteById(card.id)}
        />
      </CardRowContainer>
    ))
  ) : (
    <NoResultsMessage>No Data</NoResultsMessage>
  )
}

export default CardRows
