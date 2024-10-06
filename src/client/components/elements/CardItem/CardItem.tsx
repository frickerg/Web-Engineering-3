import { Fragment, useContext } from 'react'
import type { CardProps } from '../../../../shared/CardProps'
import { ViewportContext } from '../../../session/ResponsiveContext'

export default function CardItem(props: Partial<CardProps>) {
  const  isMobile  = useContext(ViewportContext)

  if(isMobile) {
    return (
      <div style={{ gridArea: 'table-content-card', display: 'grid'}}>
        <Fragment>
          <div>{props.front}</div>
          <div style={{ paddingTop: '2em' }} >{props.back}</div>
        </Fragment>
      </div>
    )
  }

  if(!isMobile) {
  return (
    <Fragment>
      <div>{props.front}</div>
      <div>{props.back}</div>
    </Fragment>
    )
  }

}
