import NoResultsMessage from '../../typography/texts/NoResultsMessage'
import StyledButton from '../../elements/Button/Button'
import RouterLink from '../../typography/links/RouterLink'
import TableContentContainer from '../../elements/Container/components/TableContentContainer'
import { CardProps } from '../../../../shared/types'
import CardItem from '../../elements/CardItem/CardItem'

type CardRowsProps = {
  cards: CardProps[]
  handleDeleteById: (id: string) => void
}

export default function CardRows(props: CardRowsProps) {
  return props.cards.length ? (
    props.cards.map(card => (
      <TableContentContainer key={card.id}>
        <CardItem id={card.id} front={card.front} back={card.back} />
        <RouterLink to={`details/${card.id}`}>
          <StyledButton>Edit</StyledButton>
        </RouterLink>
        <StyledButton onClick={() => props.handleDeleteById(card.id)}>
          Delete
        </StyledButton>
      </TableContentContainer>
    ))
  ) : (
    <NoResultsMessage>No Data</NoResultsMessage>
  )
}
