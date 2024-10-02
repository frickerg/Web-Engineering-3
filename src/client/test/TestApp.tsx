import { ReactNode, useContext, useEffect, useReducer } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AppProviders } from './AppProviders'
import { AuthProvider } from '../session/AuthContext'
import {
  GameContext,
  GameProvider,
  initialState,
  reducer,
} from '../session/GameContext'
import { fetchCards } from '../api'

type Props = {
  // inject more initial data here
  children?: ReactNode
}

export const TestApp = ({ children }: Props) => {
  // const [state, dispatch] = useReducer(reducer, initialState)
  // const { dispatch } = useContext(GameContext)

  // useEffect(() => {
  //   // TODO Reicht es, wenn wir nur authState.user überprüfen? oder muss hier server-seitig geprüft werden?
  //   const fetchData = async () => {
  //     try {
  //       console.log('fetchData')
  //       const cards = await fetchCards()
  //       dispatch({ type: 'SET_CARDS', payload: cards })
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchData()
  // }, [dispatch])

  return (
    <AuthProvider>
      <GameProvider>
        <AppProviders>
          <MemoryRouter>{children}</MemoryRouter>
        </AppProviders>
      </GameProvider>
    </AuthProvider>
  )
}
