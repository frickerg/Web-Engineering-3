import './CardRows.css'
import Card from '../../elements/Card/Card'
import Button from '../../elements/Button/Button'
import { Link } from 'react-router-dom'

type CardRowsProps = {
  cards: Card[]
  handleDeleteById: (id: string) => void
}

function CardRows(props: CardRowsProps) {
  return props.cards.length ? (
    props.cards.map(card => (
      <div className="card-container" key={card.id}>
        <Card id={card.id} front={card.front} back={card.back} />
        <Link to={`details/${card.id}`}>edit</Link>
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
