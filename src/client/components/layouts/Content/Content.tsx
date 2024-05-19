import './Content.css'
import { useEffect, useState } from 'react'
import Card from '../../elements/Card/Card'
import InputFilter from '../../handlers/InputFilter/InputFilter'
import SortHeader from '../../handlers/SortHeader/SortHeader'
import CardRows from '../../handlers/CardRows/CardRows'
import { v4 as uuidv4 } from 'uuid'

export type InputType = 'front' | 'back'
export type SortDirection = 'asc' | 'desc'

const fetchCards = async (): Promise<Card[]> => {
  const response = await fetch(`/api/cards`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  return data
}

function Content() {
  const [cards, setCards] = useState<Card[]>([])
  const [sortType, setSortType] = useState<InputType>('front')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [cardInput, setCardInput] = useState({ front: '', back: '' })
  const [filterChecked, setFilterChecked] = useState(false)

  useEffect(() => {
    const getCard = async () => {
      try {
        const fetchedCards = await fetchCards()
        setCards(fetchedCards)
      } catch (err) {
        console.log(err)
      }
    }
    getCard()
  }, [])

  const handleSortSelection = (e: InputType) => {
    if (e === sortType) {
      setSortDirection(direction => (direction === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortType(e)
      setSortDirection('asc')
    }
  }

  const handleDeleteById = (id: string) => {
    const updatedCards = cards.filter(card => card.id !== id)
    setCards(updatedCards)
  }

  const handleAddNewCard = () => {
    if (cardInput.front.length && cardInput.back.length) {
      const newCard = {
        id: uuidv4(),
        front: cardInput.front,
        back: cardInput.back,
      }
      setCardInput({ front: '', back: '' })
      setCards([...cards, newCard])
    }
  }

  const handleInputChange = (inputType: InputType, value: string) => {
    const updatedInput = { ...cardInput, [inputType]: value }
    setCardInput(updatedInput)
  }

  const handleCheckboxChange = (value: boolean) => {
    setFilterChecked(value)
  }

  const directionMultiplier = sortDirection === 'asc' ? 1 : -1

  const filteredCards = filterChecked
    ? cards.filter(
        card =>
          card.front.toLowerCase().includes(cardInput.front.toLowerCase()) &&
          card.back.toLowerCase().includes(cardInput.back.toLowerCase())
      )
    : cards

  const sortedCardsToShow = [...filteredCards].sort(
    (a, b) => a[sortType].localeCompare(b[sortType]) * directionMultiplier
  )

  return (
    <div>
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
      <CardRows cards={sortedCardsToShow} handleDeleteById={handleDeleteById} />
    </div>
  )
}

export default Content
