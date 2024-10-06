import styled from 'styled-components'
import { viewportDevice } from '../../../themes/Breakpoints'

export const Button = styled.button`
  width: 100%;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.25s;
  border: 1px solid transparent;
  color: white;
  background-color: #457b9d;
  &:hover {
    background-color: lightslategrey;
  }
  
  @media (${viewportDevice.desktop}) {
    border-radius: 8px;
  }
`