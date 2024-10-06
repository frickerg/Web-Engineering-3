import { Fragment, useContext } from 'react'
import type { CardProps } from '../../../../shared/CardProps'
import { ViewportContext } from '../../../session/ResponsiveContext'

export default function CardItem(props: Readonly<Partial<CardProps>>) {
  const isMobile = useContext(ViewportContext)

  if (isMobile) {
    return (
      <div style={{ gridArea: 'table-content-card', display: 'grid' }}>
        <div>{props.front}</div>
        <div style={{ paddingTop: '2em' }}>{props.back}</div>
      </div>
    )
  }

  if (!isMobile) {
    return (
      <Fragment>
        <div>{props.front}</div>
        <div>{props.back}</div>
      </Fragment>
    )
  }
}
