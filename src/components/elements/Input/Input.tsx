import { ChangeEvent } from 'react'
import './Input.css'

type InputProps = {
  value: string
  placeholder: string
  handleInputChange: (input: string) => void
}

function Input(props: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.handleInputChange(e.target.value)
  }

  return (
    <input
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={handleChange}
    />
  )
}

export default Input
