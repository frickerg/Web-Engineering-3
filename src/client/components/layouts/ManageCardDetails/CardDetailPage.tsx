import { CardBackLabel } from '../../elements/Label/components/CardBackLabel'
import { CardFrontLabel } from '../../elements/Label/components/CardFrontLabel'
import { CardDetailContainer } from '../../elements/Container/components/CardDetailContainer'
import { InputCardFront } from '../../elements/Input/components/InputCardFront'
import { InputCardBack } from '../../elements/Input/components/InputCardBack'
import { SelfAlignedButton } from '../../elements/Button/components/SelfAlignedButton'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCards, updateCard } from '../../../api'
import { GameContext } from '../../../session/GameContext'
import { CardProps } from '../../../../shared/CardProps'
import { InputType } from '../../../common/types'
import { useAuthToken } from '../../../session/useAuthToken'

export default function CardDetailPage() {
  const [card, setCard] = useState<CardProps>({ id: '', front: '', back: '' })
  const { cardId } = useParams<{ cardId: string }>()
  const navigate = useNavigate()
  const { state, dispatch } = useContext(GameContext)
  const { storeCards: cards } = state
  const token = useAuthToken()

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
        await updateCard(card, token)
        dispatch({ type: 'SET_CARDS', payload: await fetchCards(token) })
        navigate('/cards')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <CardDetailContainer>
      <CardFrontLabel>Front</CardFrontLabel>
      <CardBackLabel>Back</CardBackLabel>
      <InputCardFront
        key="front"
        value={card.front}
        placeholder="Front"
        onChange={e => handleInputChange('front', e.target.value)}
      />
      <InputCardBack
        key="back"
        value={card.back}
        placeholder="Back"
        onChange={e => handleInputChange('back', e.target.value)}
      />
      <SelfAlignedButton onClick={handleUpdate}>Update</SelfAlignedButton>
    </CardDetailContainer>
  )
}
