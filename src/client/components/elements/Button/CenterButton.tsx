import { useContext } from 'react'
import Button from './Button'
import styled from 'styled-components'
import { GameContext } from '../../../session/Context'

const CenterButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function CenterButton() {
  const { state, handleButtonClick } = useContext(GameContext)
  const { buttonLabel } = state

  return (
    <CenterButtonWrapper>
      <Button label={buttonLabel} onClick={handleButtonClick} />
    </CenterButtonWrapper>
  )
}
