import { useContext } from 'react'
import InputFilter from '../../handlers/InputFilter/InputFilter'
import SortHeader from '../../handlers/SortHeader/SortHeader'
import CardRows from '../../handlers/CardRows/CardRows'
import { addCard, deleteCard, useAuthToken } from '../../../api'
import { GameContext } from '../../../session/GameContext'
import { InputType } from '../../../common/types'

export default function ManageCardsPage() {
  const { state, dispatch } = useContext(GameContext)
  const token = useAuthToken()
  const {
    storeCards: cards,
    sortType,
    sortDirection,
    cardInput,
    filterChecked,
  } = state

  const handleSortSelection = (e: InputType) => {
    if (e === sortType) {
      dispatch({
        type: 'SET_SORT_DIRECTION',
        payload: sortDirection === 'asc' ? 'desc' : 'asc',
      })
    } else {
      dispatch({ type: 'SET_SORT_TYPE', payload: e })
      dispatch({ type: 'SET_SORT_DIRECTION', payload: 'asc' })
    }
  }

  const handleAddNewCard = async (front: string, back: string) => {
    if (front && back) {
      try {
        const newCard = await addCard({ front, back }, token)
        dispatch({ type: 'ADD_CARD', payload: newCard })
        cardInput.front = ''
        cardInput.back = ''
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleDeleteById = async (id: string) => {
    try {
      await deleteCard(id, token)
      dispatch({ type: 'DELETE_CARD', payload: id })
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (inputType: InputType, value: string) => {
    dispatch({
      type: 'SET_CARD_INPUT',
      payload: { ...cardInput, [inputType]: value },
    })
  }

  const handleCheckboxChange = (value: boolean) => {
    dispatch({ type: 'SET_FILTER_CHECKED', payload: value })
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
