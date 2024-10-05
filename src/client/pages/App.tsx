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
import LoginPage from '../../onlyForTestPurpose/LoginPage'
import PrivateRoute from '../components/routes/PrivateRoute'
import AccessDeniedPage from '../../onlyForTestPurpose/AccessDeniedPage'
import { AuthContext } from '../session/AuthContext'
import { useAuthToken } from '../session/useAuthToken'

export default function App() {
  const { state: gameState, dispatch: gameDispatch } = useContext(GameContext)
  const { state: authState } = useContext(AuthContext)
  const token = useAuthToken()

  useEffect(() => {
    // TODO Reicht es, wenn wir nur authState.user überprüfen? oder muss hier server-seitig geprüft werden?
    if (authState.user) {
      const fetchData = async () => {
        try {
          gameDispatch({
            type: 'SET_CARDS',
            payload: await fetchCards(token),
          })
        } catch (error) {
          console.error(error)
        }
      }
      fetchData()
    }
  }, [authState.user, gameDispatch, token])

  const renderContent = () => {
    switch (gameState.gameState) {
      case GameState.ONGOING:
        return <OngoingGamePage />
      case GameState.FINISHED:
        return <GameResultPage />
      case GameState.NOT_STARTED:
      default:
        return <StartNewGamePage />
    }
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
      <DefaultTheme />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/accessDenied" element={<AccessDeniedPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={renderContent()} />
            <Route path="cards" element={<PrivateRoute role="admin" />}>
              <Route index element={<ManageCardsPage />} />
              <Route path="details/:cardId" element={<CardDetailPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}
