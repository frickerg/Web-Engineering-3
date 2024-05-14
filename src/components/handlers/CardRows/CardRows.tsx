import './CardRows.css'
import Card from '../../elements/Card/Card'
import Button from '../../elements/Button/Button'

type CardRowsProps = {
  cards: Card[]
  handleDeleteById: (id: number) => void
}

function CardRows(props: CardRowsProps) {
  return props.cards.length ? (
    props.cards.map(card => (
      <div className="card-container" key={card.id}>
        <Card id={card.id} front={card.front} back={card.back} />
        <Button
          label="Delete"
          onClick={() => props.handleDeleteById(card.id)}
        />
      </div>
    ))
  ) : (
    <div className="no-data">No Data</div>
  )
}

export default CardRows
