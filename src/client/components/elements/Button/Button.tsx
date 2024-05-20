import { MouseEventHandler } from 'react'
import './Button.css'

type Button = {
  label: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

function Button(props: Readonly<Button>) {
  return (
    <button className={`${props.className}`} onClick={props.onClick}>
      {props.label}
    </button>
  )
}

export default Button
