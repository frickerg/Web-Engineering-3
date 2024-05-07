import { useState } from 'react'
import './Content.css'
import baseData from '../../../data/baseData'
import Card from '../../elements/Card/Card'
import InputFilter from '../../handlers/InputFilter/InputFilter'
import SortHeader from '../../handlers/SortHeader/SortHeader'
import CardRows from '../../handlers/CardRows/CardRows'

export type InputType = 'front' | 'back'
export type SortDirection = 'asc' | 'desc'

function Content() {
  const [cards, setCards] = useState<Card[]>(baseData)
  const [cardsToShow, setCardsToShow] = useState<Card[]>([...cards])
  const [sortType, setSortType] = useState<InputType>('front')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [cardInput, setCardInput] = useState({ front: '', back: '' })
  const [filterChecked, setFilterChecked] = useState(false)

  const handleSortSelection = (e: InputType) => {
    if (e === sortType) {
      setSortDirection(direction => (direction === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortType(e)
      setSortDirection('asc')
    }
  }

  const sortCards = (cards: Card[], type: InputType) => {
    const directionMultiplier = sortDirection === 'asc' ? 1 : -1
    return [...cards].sort(
      (a, b) => a[type].localeCompare(b[type]) * directionMultiplier
    )
  }

  const handleDeleteById = (id: number) => {
    const updatedCards = cards.filter(card => card.id !== id)
    setCards(updatedCards)
    setCardsToShow(updatedCards)

    if (filterChecked) {
      setCardsToShow(
        updatedCards.filter(
          card =>
            card.front.toLowerCase().includes(cardInput.front.toLowerCase()) &&
            card.back.toLowerCase().includes(cardInput.back.toLowerCase())
        )
      )
    }
  }

  const handleInputChange = (inputType: InputType, value: string) => {
    const updatedInput = { ...cardInput, [inputType]: value }
    setCardInput(updatedInput)

    const { front, back } = updatedInput
    if (filterChecked && (front || back)) {
      const matchingCards = cards.filter(
        card =>
          (!front || card.front.toLowerCase().includes(front.toLowerCase())) &&
          (!back || card.back.toLowerCase().includes(back.toLowerCase()))
      )
      setCardsToShow(matchingCards)
    } else {
      setCardsToShow(cards)
    }
  }

  const handleAddNewCard = () => {
    if (cardInput.front.length && cardInput.back.length) {
      setCardInput({ front: '', back: '' })
      const newCard = {
        id: cards.length ? cards[cards.length - 1].id + 1 : 1,
        front: cardInput.front,
        back: cardInput.back,
      }
      setCards([...cards, newCard])
      setCardsToShow([...cards, newCard])
    }
  }

  const handleCheckboxChange = (value: boolean) => {
    setFilterChecked(value)
    setCardsToShow(cards)

    if (value) {
      const matchingCards = cards.filter(
        card =>
          card.front.toLowerCase().includes(cardInput.front.toLowerCase()) &&
          card.back.toLowerCase().includes(cardInput.back.toLowerCase())
      )
      setCardsToShow(matchingCards)
    }
  }

  return (
    <div className="table">
      <InputFilter
        front={cardInput.front}
        back={cardInput.back}
        filterChecked={filterChecked}
        handleAddNewCard={handleAddNewCard}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
      />
      <SortHeader
        sortType={sortType}
        sortDirection={sortDirection}
        handleSortSelection={handleSortSelection}
      />
      <CardRows
        cards={sortCards(cardsToShow, sortType)}
        handleDeleteById={handleDeleteById}
      />
    </div>
  )
}

export default Content
