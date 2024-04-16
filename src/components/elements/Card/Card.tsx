import { Fragment } from 'react'
import './Card.css'

type Card = {
  id: number
  front: string
  back: string
}

function Card(props: Card) {
  return (
    <Fragment key={props.id}>
      <div>{props.front}</div>
      <div>{props.back}</div>
    </Fragment>
  )
}

export default Card
