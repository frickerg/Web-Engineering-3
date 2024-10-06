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
import { GameState } from '../../shared/GameState'
import { fetchCards, fetchCurrentGame } from '../api'
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
    const fetchData = async () => {
      try {
        if (authState.user) {
          const cards = await fetchCards(token)
          gameDispatch({ type: 'SET_CARDS', payload: cards })

          const currentGame = await fetchCurrentGame(token)
          if (currentGame && currentGame.gameState !== GameState.NOT_STARTED) {
            gameDispatch({
              type: 'LOAD_GAME_STATE',
              payload: currentGame,
            })
          } else {
            gameDispatch({ type: 'DELETE_GAME' })
          }
        } else {
          gameDispatch({ type: 'DELETE_GAME' })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
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
