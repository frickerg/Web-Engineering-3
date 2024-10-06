import { useContext } from 'react'
import { Button } from '../Button'
import styled from 'styled-components'
import { GameContext } from '../../../../session/GameContext'
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
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`
