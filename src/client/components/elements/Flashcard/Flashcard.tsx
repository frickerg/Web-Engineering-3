import './Flashcard.css'
import { Fragment } from 'react'
import type { FlashcardProps } from '../../../../model/Card'

function Flashcard(props: Readonly<FlashcardProps>) {
  return (
    <Fragment>
      <div>{props.front}</div>
    </Fragment>
  )
}

export default Flashcard
export type { FlashcardProps }
