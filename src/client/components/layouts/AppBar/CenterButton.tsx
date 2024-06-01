import { useContext } from 'react'
import { GameContext } from '../../../../api/GameContext'
import Button from '../../elements/Button/Button'
import styled from 'styled-components'

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
