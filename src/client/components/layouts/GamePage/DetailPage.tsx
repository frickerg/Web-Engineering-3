import '../GamePage/DetailPage.css'
import Button from '../../elements/Button/Button'
import Input from '../../elements/Input/Input'
import Label from '../../elements/Label/Label'
import { CardProps } from '../../elements/Card/Card'
import { InputType } from '../Content/Content'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCardById, updateCard } from '../../../../api/card'

export default function DetailPage() {
  const [card, setCard] = useState<CardProps>({ id: '', front: '', back: '' })
  const { cardId } = useParams<{ cardId: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const getCard = async () => {
      try {
        const fetchedCard = await fetchCardById(cardId as string)
        setCard(fetchedCard)
      } catch (error) {
        console.error(error)
      }
    }
    if (cardId) {
      getCard()
    }
  }, [cardId])

  const handleInputChange = (inputType: InputType, value: string) => {
    setCard(
      prevCard =>
        ({
          ...prevCard,
          [inputType]: value,
        } as CardProps)
    )
  }

  const handleUpdate = async () => {
    if (card) {
      try {
        await updateCard(card)
        navigate('/')
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
