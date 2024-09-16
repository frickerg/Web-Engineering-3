import styled from 'styled-components'
import { ChildrenProps } from '../types'

export default function ProgressHeader(props: Readonly<ChildrenProps>) {
  return <StyledProgressHeader>{props.children}</StyledProgressHeader>
}

const StyledProgressHeader = styled.h2`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
