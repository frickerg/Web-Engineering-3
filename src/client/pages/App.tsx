import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import { ThemeProvider } from 'styled-components'
import { DefaultTheme } from '../themes/DefaultTheme'
import ManageCardsPage from '../components/layouts/ManageCardDetails/ManageCardsPage'
import StartNewGamePage from '../components/layouts/GamePage/StartNewGamePage'
import OngoingGamePage from '../components/layouts/GamePage/OngoingGamePage'
import GameResultPage from '../components/layouts/GamePage/GameResultPage'
import CardDetailPage from '../components/layouts/ManageCardDetails/CardDetailPage'
import { useContext, useEffect } from 'react'
import { GameContext } from '../session/GameContext'
import { GameState } from '../session/helper'
import { fetchCards } from '../api'
import { AuthContext } from '../session/AuthContext'
import LoginPage from '../../onlyForTestPurpose/LoginPage'

export default function App() {
  const { state: authState } = useContext(AuthContext)
  const { state, dispatch } = useContext(GameContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'SET_CARDS', payload: await fetchCards() })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [dispatch])

  const renderContent = () => {
    switch (state.gameState) {
      case GameState.ONGOING:
        return <OngoingGamePage />
      case GameState.FINISHED:
        return <GameResultPage />
      case GameState.NOT_STARTED:
      default:
        return <StartNewGamePage />
    }
  }

  if (!authState.user) {
    return <LoginPage />
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
      <DefaultTheme />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={renderContent()} />
          <Route path="cards" element={<ManageCardsPage />} />
          <Route path="cards/details/:cardId" element={<CardDetailPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}
