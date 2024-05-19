import '../GamePage/DetailPage.css'

import Button from '../../elements/Button/Button'
import Input from '../../elements/Input/Input'
import { InputType } from '../Content/Content'
import Label from '../../elements/Label/Label'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../elements/Card/Card'

const fetchCard = async (id: string | undefined): Promise<Card> => {
  console.log(`fetchcard: ${id}`)
  const response = await fetch(`/api/cards/${id}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  return data
}

const saveCard = async (card: Card) => {
  await fetch(`/api/cards/${card.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(card),
  })
}

export default function DetailPage() {
  const { cardId } = useParams<{ cardId: string }>()
  const navigate = useNavigate()
  const [card, setCard] = useState<Card>({ id: '', front: '', back: '' })

  useEffect(() => {
    const getCard = async () => {
      try {
        const fetchedCard = await fetchCard(cardId as string)
        setCard(fetchedCard)
      } catch (err) {
        console.log(err)
      }
    }
    if (cardId) {
      getCard()
    }
  }, [cardId /* TODO cardId or fetchCard ? */])

  const handleInputChange = (inputType: InputType, value: string) => {
    console.log('handleInputChange' + inputType + ' ' + value)
    setCard(
      prevCard =>
        ({
          ...prevCard,
          [inputType]: value,
        } as Card)
    )
  }

  const handleSave = async () => {
    if (card) {
      await saveCard(card)
      navigate('/')
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
        onClick={() => handleSave()}
      />
    </div>
  )
}
