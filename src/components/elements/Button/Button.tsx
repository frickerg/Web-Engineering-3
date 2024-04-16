import { MouseEventHandler } from 'react'
import './Button.css'

type Button = {
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

function Button(props: Button) {
  return <button onClick={props.onClick}>{props.label}</button>
}

export default Button
