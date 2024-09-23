import { useContext } from 'react'
import { Button } from '../Button'
import styled from 'styled-components'
import { GameContext } from '../../../../session/Context'
import { useNavigate } from 'react-router-dom'

export default function CenterButton() {
  const { state } = useContext(GameContext)
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('/')
  }

  return (
    <CenterButtonWrapper onClick={handleOnClick}>
      {state.buttonLabel}
    </CenterButtonWrapper>
  )
}

const CenterButtonWrapper = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`
