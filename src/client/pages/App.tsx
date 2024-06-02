import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './Layout'
import Content from '../components/layouts/Content/Content'
import NewPage from '../components/layouts/GamePage/NewPage'
import Ongoing from '../components/layouts/GamePage/Ongoing'
import EndPage from '../components/layouts/GamePage/EndPage'
import DetailPage from '../components/layouts/GamePage/DetailPage'
import { useContext, useEffect } from 'react'
import { GameContext } from '../../api/GameContext'
import { GameState } from '../../api/GameState'
import { fetchCards } from '../../api/card'
import { CardContext } from '../../api/CardContext'

function App() {
  const { state: gameState } = useContext(GameContext)
  const { dispatch: cardDispatch } = useContext(CardContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCards = await fetchCards()
        cardDispatch({ type: 'SET_CARDS', payload: fetchedCards })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const renderContent = () => {
    switch (gameState.gameState) {
      case GameState.NOT_STARTED:
        return <NewPage />
      case GameState.START:
      case GameState.ONGOING:
        return <Ongoing />
      case GameState.FINISHED:
        return <EndPage />
      default:
        return <NewPage />
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={renderContent()} />
        <Route path="cards" element={<Content />} />
        <Route path="cards/details/:cardId" element={<DetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
