import { Fragment } from 'react'
import type { CardProps } from '../../../../model/Card'

function Card(props: Readonly<CardProps>) {
  return (
    <Fragment>
      <div>{props.front}</div>
      <div>{props.back}</div>
    </Fragment>
  )
}

export default Card
export type { CardProps }
