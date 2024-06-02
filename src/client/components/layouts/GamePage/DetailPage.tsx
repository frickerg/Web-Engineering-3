import '../GamePage/DetailPage.css'
import Button from '../../elements/Button/Button'
import Input from '../../elements/Input/Input'
import Label from '../../elements/Label/Label'
import { CardProps } from '../../elements/Card/Card'
import { InputType, CardContext } from '../../../../api/CardContext'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateCard } from '../../../../api/card'

export default function DetailPage() {
  const [card, setCard] = useState<CardProps>({ id: '', front: '', back: '' })
  const { cardId } = useParams<{ cardId: string }>()
  const navigate = useNavigate()
  const { state } = useContext(CardContext)
  const { cards } = state

  useEffect(() => {
    if (cardId) {
      const fetchedCard = cards.find(card => card.id === cardId)
      if (fetchedCard) {
        setCard(fetchedCard)
      }
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
        navigate('/cards')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="detail-container">
      <Label className="detail-label-front" label="Front"></Label>
      <Label className="detail-label-back" label="Back"></Label>
      <Input
        className="detail-card-front"
        key="front"
        value={card.front}
        placeholder="Front"
        handleInputChange={value => handleInputChange('front', value)}
      />
      <Input
        className="detail-card-back"
        key="back"
        value={card.back}
        placeholder="Back"
        handleInputChange={value => handleInputChange('back', value)}
      />
      <Button
        className="detail-button"
        label="Update"
        onClick={() => handleUpdate()}
      />
    </div>
  )
}
