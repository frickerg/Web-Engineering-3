import { ChangeEvent } from 'react'
import styled from 'styled-components'

type InputProps = {
  value: string
  placeholder: string
  handleInputChange: (input: string) => void
  className?: string
}

const StyledInput = styled.input`
  width: 100%;
  color: #6a94b8;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #457b9d;
  padding-top: 30px;
  padding-bottom: 10px;
  ::placeholder {
    color: #99b4c5;
  }
  &:focus,
  &:focus-visible {
    outline: none;
    border-bottom: 2px solid #457b9d;
  }
`

function Input(props: Readonly<InputProps>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.handleInputChange(e.target.value)
  }

  return (
    <StyledInput
      className={props.className}
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={handleChange}
    />
  )
}

export default Input
