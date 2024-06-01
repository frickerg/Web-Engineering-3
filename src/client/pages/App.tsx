import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './Layout'
import Content from '../components/layouts/Content/Content'
import NewPage from '../components/layouts/GamePage/NewPage'
import Ongoing from '../components/layouts/GamePage/Ongoing'
import EndPage from '../components/layouts/GamePage/EndPage'
import DetailPage from '../components/layouts/GamePage/DetailPage'
import { useContext } from 'react'
import { GameContext, GameState } from '../../api/GameContext'

function App() {
  const { state } = useContext(GameContext)

  const renderContent = () => {
    switch (state.gameState) {
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
