import styled from 'styled-components'

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

export const Button = StyledButton
