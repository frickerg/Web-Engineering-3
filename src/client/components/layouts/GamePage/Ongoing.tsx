import { useState, useEffect } from 'react'
import './GamePage.css'
import Button from '../../elements/Button/Button'
import { FlashcardProps } from '../../../../model/Card'
import { getGameCards, isAnswerCorrect } from '../../../../api/card'
import Flashcard from '../../elements/Flashcard/Flashcard'

export default function Ongoing() {
  const [index, setIndex] = useState(0)
  const [cards, setCards] = useState<FlashcardProps[]>([])
  const maxIndex = 3
  const progress = Math.round((index / maxIndex) * 100)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedCards = await getGameCards(maxIndex)
        setCards(fetchedCards)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCards()
  }, [])

  const incrementIndex = () => {
    setIndex(prevIndex => (prevIndex < maxIndex ? prevIndex + 1 : prevIndex))
  }

  const validateCard = async () => {
    const currentCard = cards[index]
    const userAnswer = '' // TODO: get user input from input field
    const isCorrect = await isAnswerCorrect(currentCard.id, userAnswer)
    setCards(prevCards =>
      prevCards.map((card, i) => (i === index ? { ...card, isCorrect } : card))
    )
    incrementIndex()
  }

  return (
    <div className="ongoing">
      <h1>Progress: {progress}%</h1>
      <button onClick={() => alert('game deleted!')}>Delete Game</button>
      <div className="flashcard">
        {cards.length > 0 && <Flashcard {...cards[index]} />}
        <input type="text" placeholder="Answer" />
        <Button className="sumbit" label="Submit" onClick={validateCard} />
      </div>
    </div>
  )
}
