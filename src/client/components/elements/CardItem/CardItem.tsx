import { Fragment } from 'react'
import type { CardProps } from '../../../../shared/CardProps'

export default function CardItem(props: Readonly<CardProps>) {
  return (
    <Fragment>
      <div>{props.front}</div>
      <div>{props.back}</div>
    </Fragment>
  )
}
