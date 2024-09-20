import { MouseEventHandler } from 'react'
import styled from 'styled-components'

type ButtonProps = {
  label: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function Button(props: Readonly<ButtonProps>) {
  return (
    <StyledButton className={props.className} onClick={props.onClick}>
      {props.label}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.25s;
  border: 1px solid transparent;
  color: white;
  background-color: #457b9d;
  &:hover {
    background-color: lightslategrey;
  }
`
