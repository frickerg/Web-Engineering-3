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
  const { state, dispatch } = useContext(GameContext)
  const { buttonLabel } = state
  const navigate = useNavigate()

  const handleOnClick = () => {
    dispatch({ type: 'SET_CARD_INDEX', payload: state.currentCardIndex })
    navigate('/')
  }

  return (
    <CenterButtonWrapper>
      <Button label={buttonLabel} onClick={handleOnClick} />
    </CenterButtonWrapper>
  )
}
