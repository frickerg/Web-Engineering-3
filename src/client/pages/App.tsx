import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import { ThemeProvider } from 'styled-components'
import DefaultTheme from '../themes/DefaultTheme'
import Content from '../components/layouts/Content/Content'
import NewPage from '../components/layouts/GamePage/NewPage'
import Ongoing from '../components/layouts/GamePage/Ongoing'
import EndPage from '../components/layouts/GamePage/EndPage'
import DetailPage from '../components/layouts/GamePage/DetailPage'
import { useContext, useEffect } from 'react'
import { GameContext } from '../session/Context'
import { GameState } from '../../model/Game'
import { fetchCards } from '../api'

export default function App() {
  const { state, dispatch } = useContext(GameContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCards = await fetchCards()
        dispatch({ type: 'SET_CARDS', payload: fetchedCards })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [dispatch])

  const renderContent = () => {
    switch (state.gameState) {
      case GameState.ONGOING:
        return <Ongoing />
      case GameState.FINISHED:
        return <EndPage />
      case GameState.NOT_STARTED:
      default:
        return <NewPage />
    }
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
      <DefaultTheme />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={renderContent()} />
          <Route path="cards" element={<Content />} />
          <Route path="cards/details/:cardId" element={<DetailPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}
