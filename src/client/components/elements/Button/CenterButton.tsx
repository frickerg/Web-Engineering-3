import { useContext } from 'react'
import Button from './Button'
import styled from 'styled-components'
import { GameContext } from '../../../session/Context'
import { useNavigate } from 'react-router-dom'

const CenterButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function CenterButton() {
  const { state } = useContext(GameContext)
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('/')
  }

  return (
    <CenterButtonWrapper>
      <Button label={state.buttonLabel} onClick={handleOnClick} />
    </CenterButtonWrapper>
  )
}
