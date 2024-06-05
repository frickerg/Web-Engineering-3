import NoResultsMessage from '../../typography/texts/NoResultsMessage'
import Button from '../../elements/Button/Button'
import Card, { CardProps } from '../../elements/Card/Card'
import RouterLink from '../../typography/links/RouterLink'
import TableContentContainer from '../../elements/Container/TableContentContainer'

type CardRowsProps = {
  cards: CardProps[]
  handleDeleteById: (id: string) => void
}

function CardRows(props: CardRowsProps) {
  return props.cards.length ? (
    props.cards.map(card => (
      <TableContentContainer key={card.id}>
        <Card id={card.id} front={card.front} back={card.back} />
        <RouterLink to={`details/${card.id}`}>
          <Button label="Edit"></Button>
        </RouterLink>
        <Button
          label="Delete"
          onClick={() => props.handleDeleteById(card.id)}
        />
      </TableContentContainer>
    ))
  ) : (
    <NoResultsMessage>No Data</NoResultsMessage>
  )
}

export default CardRows
