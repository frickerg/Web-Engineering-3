import CardBackLabel from '../../elements/Label/components/CardBackLabel'
import CardFrontLabel from '../../elements/Label/components/CardFrontLabel'
import CardDetailContainer from '../../elements/Container/components/CardDetailContainer'
import InputCardFront from '../../elements/Input/components/InputCardFront'
import InputCardBack from '../../elements/Input/components/InputCardBack'
import SelfAlignedButton from '../../elements/Button/components/SelfAlignedButton'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCards, updateCard } from '../../../api'
import { GameContext } from '../../../session/Context'
import { CardProps } from '../../../../shared/types'
import { InputType } from '../../../common/types'

export default function CardDetailPage() {
  const [card, setCard] = useState<CardProps>({ id: '', front: '', back: '' })
  const { cardId } = useParams<{ cardId: string }>()
  const navigate = useNavigate()
  const { state, dispatch } = useContext(GameContext)
  const { storeCards: cards } = state

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
    <CardDetailContainer>
      <CardFrontLabel label="Front"></CardFrontLabel>
      <CardBackLabel label="Back"></CardBackLabel>
      <InputCardFront
        key="front"
        value={card.front}
        placeholder="Front"
        handleInputChange={value => handleInputChange('front', value)}
      />
      <InputCardBack
        key="back"
        value={card.back}
        placeholder="Back"
        handleInputChange={value => handleInputChange('back', value)}
      />
      <SelfAlignedButton onClick={handleUpdate}>Update</SelfAlignedButton>
    </CardDetailContainer>
  )
}
