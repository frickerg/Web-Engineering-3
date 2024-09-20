import styled from 'styled-components'

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

export const Input = StyledInput
