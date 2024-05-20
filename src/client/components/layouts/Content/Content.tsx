import './Content.css'
import { useContext, useEffect, useState } from 'react'
import InputFilter from '../../handlers/InputFilter/InputFilter'
import SortHeader from '../../handlers/SortHeader/SortHeader'
import CardRows from '../../handlers/CardRows/CardRows'
import { addCard, deleteCard, fetchCards } from '../../../../api/card'
import { CardContext } from '../../../../api/CardContext'

export type InputType = 'front' | 'back'
export type SortDirection = 'asc' | 'desc'

function Content() {
  const { state, dispatch } = useContext(CardContext)
  const { cards } = state
  const [sortType, setSortType] = useState<InputType>('front')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [cardInput, setCardInput] = useState({ front: '', back: '' })
  const [filterChecked, setFilterChecked] = useState(false)

  useEffect(() => {
    const getCard = async () => {
      try {
        const fetchedCards = await fetchCards()
        dispatch({ type: 'SET_CARDS', payload: fetchedCards })
      } catch (error) {
        console.error(error)
      }
    }
    getCard()
  }, [dispatch])

  const handleSortSelection = (e: InputType) => {
    if (e === sortType) {
      setSortDirection(direction => (direction === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortType(e)
      setSortDirection('asc')
    }
  }

  const handleAddNewCard = async (front: string, back: string) => {
    if (front && back) {
      try {
        const newCard = await addCard({ front, back })
        dispatch({ type: 'ADD_CARD', payload: newCard })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleDeleteById = async (id: string) => {
    try {
      await deleteCard(id)
      dispatch({ type: 'DELETE_CARD', payload: id })
    } catch (error) {
      console.error(error)
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
