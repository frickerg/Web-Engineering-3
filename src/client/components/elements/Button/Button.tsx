import styled from 'styled-components'
import { viewportDevice } from '../../../themes/Breakpoints'

export const Button = styled.button`
  width: 100%;
  padding: 0.5em;
  margin: 0.1em 0;
  cursor: pointer;
  transition: background-color 0.25s;
  border: 0.0625em solid transparent;
  color: white;
  background-color: #457b9d;
  &:hover {
    background-color: lightslategrey;
  }

  @media (${viewportDevice.desktop}) {
    border-radius: 0.5em;
  }
`
