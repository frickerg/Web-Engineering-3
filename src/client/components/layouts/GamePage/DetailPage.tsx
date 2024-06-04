import Button from '../../elements/Button/Button'
import Container from '../../elements/Container/Container'
import Input from '../../elements/Input/Input'
import Label from '../../elements/Label/Label'
import { CardProps } from '../../elements/Card/Card'
import { InputType, CardContext } from '../../../../api/CardContext'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCards, updateCard } from '../../../../api/card'
import styled from 'styled-components'

const DetailPageButton = styled(Button)`
  grid-area: detail-button;
  align-self: last baseline;
`

const DetailPageContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr 18%;
  grid-template-rows: auto auto;
  overflow: auto;
  column-gap: 15px;
  row-gap: 15px;
  padding: 15px 25px;
  align-items: center;
  grid-template-areas:
    'detail-label-front detail-label-back spacer'
    'detail-card-front detail-card-back detail-button';
`

const DetailPageFrontLabel = styled(Label)`
  grid-area: detail-label-front;
`

const DetailPageBackLabel = styled(Label)`
  grid-area: detail-label-back;
`

const DetailPageFrontInput = styled(Input)`
  grid-area: detail-card-front;
`

const DetailPageBackInput = styled(Input)`
  grid-area: detail-card-back;
`


export default function DetailPage() {
  const [card, setCard] = useState<CardProps>({ id: '', front: '', back: '' })
  const { cardId } = useParams<{ cardId: string }>()
  const navigate = useNavigate()
  const { state, dispatch } = useContext(CardContext)
  const { cards } = state

  useEffect(() => {
    if (!cardId) {
      return
    }
    const fetchedCard = cards.find(({ id }) => id === cardId)
    if (fetchedCard) {
      setCard(fetchedCard)
    }
  }, [cardId, cards])

  const handleInputChange = (inputType: InputType, value: string) => {
    setCard(prevCard => ({
      ...prevCard,
      [inputType]: value,
    }))
  }

  const handleUpdate = async () => {
    if (card) {
      try {
        await updateCard(card)
        dispatch({ type: 'SET_CARDS', payload: await fetchCards() })
        navigate('/cards')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <DetailPageContainer className="detail-container">
      <DetailPageFrontLabel className="detail-label-front" label="Front"></DetailPageFrontLabel>
      <DetailPageBackLabel className="detail-label-back" label="Back"></DetailPageBackLabel>
      <DetailPageFrontInput
        className="detail-card-front"
        key="front"
        value={card.front}
        placeholder="Front"
        handleInputChange={value => handleInputChange('front', value)}
      />
      <DetailPageBackInput
        className="detail-card-back"
        key="back"
        value={card.back}
        placeholder="Back"
        handleInputChange={value => handleInputChange('back', value)}
      />
      <DetailPageButton
        className="detail-button"
        label="Update"
        onClick={() => handleUpdate()}
      />
    </DetailPageContainer>
  )
}
