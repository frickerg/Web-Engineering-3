import { Fragment } from 'react'
import type { CardProps } from '../../../../model/Card'

export default function Card(props: Readonly<CardProps>) {
  return (
    <Fragment>
      <div>{props.front}</div>
      <div>{props.back}</div>
    </Fragment>
  )
}
