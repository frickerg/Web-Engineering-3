import { createTheme, MantineProvider } from '@mantine/core'
import {
  Fragment,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { Outlet } from 'react-router-dom'
import { fetchCards } from '../api'
import { GameContext, initialState, reducer } from '../session/GameContext'

const theme = createTheme({
  autoContrast: true,
  colors: {
    todo: [
      '#e3fff0',
      '#d1fae3',
      '#a5f3c8',
      '#76ebab',
      '#50e592',
      '#36e182',
      '#24df79',
      '#10c668',
      '#00b05a',
      '#00984a',
    ],
  },
  primaryColor: 'todo',
})

export const AppProviders = ({ children }: PropsWithChildren) => {
  const { dispatch } = useContext(GameContext)

  useEffect(() => {
    // TODO Reicht es, wenn wir nur authState.user überprüfen? oder muss hier server-seitig geprüft werden?
    const fetchData = async () => {
      try {
        console.log('fetchData')
        const cards = await fetchCards()
        dispatch({ type: 'SET_CARDS', payload: cards })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [dispatch])

  return <Fragment>{children}</Fragment>
}
