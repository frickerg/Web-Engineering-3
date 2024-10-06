import { NoResultsMessage } from '../../typography/texts/NoResultsMessage'
import { Button } from '../../elements/Button/Button'
import { RouterLink } from '../../typography/links/RouterLink'
import { TableContentContainer } from '../../elements/Container/components/TableContentContainer'
import { CardProps } from '../../../../shared/CardProps'
import CardItem from '../../elements/CardItem/CardItem'
import { useContext } from 'react'
import { ViewportContext } from '../../../session/ResponsiveContext'

type CardRowsProps = {
  cards: CardProps[]
  handleDeleteById: (id: string) => void
}

export default function CardRows(props: CardRowsProps) {
  const isMobile = useContext(ViewportContext)

  if (isMobile) {
    return props.cards.length ? (
      props.cards.map(card => (
        <TableContentContainer key={card.id}>
          <CardItem id={card.id} front={card.front} back={card.back} />
          <div style={{ gridArea: 'table-content-button-edit' }}>
            <RouterLink to={`details/${card.id}`}>
              <Button>Edit</Button>
            </RouterLink>
          </div>
          <div style={{ gridArea: 'table-content-button-delete' }}>
            <Button onClick={() => props.handleDeleteById(card.id)}>
              Delete
            </Button>
          </div>
        </TableContentContainer>
      ))
    ) : (
      <NoResultsMessage>No Data</NoResultsMessage>
    )
  }

  if (!isMobile) {
    return props.cards.length ? (
      props.cards.map(card => (
        <TableContentContainer key={card.id}>
          <CardItem id={card.id} front={card.front} back={card.back} />
          <RouterLink to={`details/${card.id}`}>
            <Button>Edit</Button>
          </RouterLink>
          <Button onClick={() => props.handleDeleteById(card.id)}>
            Delete
          </Button>
        </TableContentContainer>
      ))
    ) : (
      <NoResultsMessage>No Data</NoResultsMessage>
    )
  }
}
