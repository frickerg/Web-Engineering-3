import { Fragment } from 'react'
import './Card.css'

type Card = {
  id: string
  front: string
  back: string
}

function Card(props: Readonly<Card>) {
  return (
    <Fragment>
      <div>{props.id}</div>
      <div>{props.front}</div>
      <div>{props.back}</div>
    </Fragment>
  )
}

export default Card
