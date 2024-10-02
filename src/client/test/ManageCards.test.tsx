import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import {
  describe,
  it,
  expect,
  vitest,
  afterEach,
  beforeAll,
  afterAll,
  test,
} from 'vitest'
import { GameContext, GameProvider, initialState } from '../session/GameContext'
import ManageCardsPage from '../components/layouts/ManageCardDetails/ManageCardsPage'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { TestApp } from './TestApp'

const getCards = vitest.fn()
const addCard = vitest.fn()
const deleteCard = vitest.fn()
const mockDispatch = vitest.fn()

const handlers = [
  http.get('/api/cards', async () => {
    console.log('Mocked API call to /api/cards')
    return HttpResponse.json([
      { id: '1', front: 'Front 1', back: 'Back 1' },
      { id: '2', front: 'Front 2', back: 'Back 2' },
    ])
  }),
  http.post('/api/card', async req => {
    // const json = await req.request.json()
    const json = (await req.request.json()) as object
    console.log('add card: json', json)
    addCard(json)
    return HttpResponse.json({
      ...json,
      id: crypto.randomUUID(),
    })
  }),
  http.delete('/api/card/:id', async ({ params }) => {
    const { id } = params
    deleteCard(id)
    console.log('delete card')
  }),
]
const server = setupServer(...handlers)

afterEach(() => {
  getCards.mockReset()
  addCard.mockReset()
  deleteCard.mockReset()
  mockDispatch.mockReset()
  cleanup()
})

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('ManageCardsPage Component', () => {
  const mockGameContext = {
    state: initialState,
    dispatch: () => null,
  }

  test('renders ManageCardsPage component', async () => {
    render(
      // <GameProvider>
      <TestApp>
        <ManageCardsPage />
      </TestApp>
      // </GameProvider>
    )

    expect(screen.getByText('Front ▲')).toBeInTheDocument()
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument()

    // FIXME: cardStore aus dem mockGameContext greift hier nicht?
    // expect(screen.getByText('Front 1')).toBeInTheDocument()
    // expect(screen.getByText('Front 2')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Front 1')).toBeInTheDocument()
      expect(screen.getByText('Front 2')).toBeInTheDocument()
    })
  })

  it('handles sorting when SortHeader is clicked', async () => {
    const user = userEvent.setup()

    render(
      <TestApp>
        <ManageCardsPage />
      </TestApp>

      // <GameContext.Provider value={mockGameContext}>
      //   <ManageCardsPage />
      // </GameContext.Provider>
    )
    const sort = await screen.findByText(/▲/i)
    await user.click(sort)

    // FIXME: klicken der Front löst nichts aus, ich weiss nicht woran es liegt

    // expect(mockDispatch).toHaveBeenCalledWith({
    //   type: 'SET_SORT_DIRECTION',
    //   payload: 'desc',
    // })

    await waitFor(() => {
      expect(screen.getByText(/▼/i)).toBeInTheDocument()
    })

    // expect(mockDispatch).toHaveBeenCalledWith({
    //   type: 'SET_SORT_TYPE',
    //   payload: 'front',
    // })
  })

  it('handles adding a new card', async () => {
    const user = userEvent.setup()
    render(
      <TestApp>
        <ManageCardsPage />
      </TestApp>
      // <GameContext.Provider value={mockGameContext}>
      //   <ManageCardsPage />
      // </GameContext.Provider>
    )
    await user.type(screen.getByPlaceholderText('Front'), 'Front 3')
    await user.type(screen.getByPlaceholderText('Back'), 'Back 3')
    await user.click(screen.getByRole('button', { name: /Add/i }))

    // TODO #3: der brudi macht hier nix
    await waitFor(() => {
      expect(addCard).toHaveBeenCalledWith({
        front: 'Front 3',
        back: 'Back 3',
      })
      // expect(mockDispatch).toHaveBeenCalledWith({
      //   type: 'ADD_CARD',
      //   payload: {
      //     id: '3',
      //     front: 'Front 3',
      //     back: 'Back 3',
      //   },
      // })
    })
  })

  it('handles deleting a card', async () => {
    const user = userEvent.setup()

    render(
      <TestApp>
        <ManageCardsPage />
      </TestApp>

      // <GameContext.Provider value={mockGameContext}>
      //   <ManageCardsPage />
      // </GameContext.Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('Front 1')).toBeInTheDocument()
    })

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i })
    await user.click(deleteButtons[0])

    await waitFor(() => {
      expect(deleteCard).toHaveBeenCalledWith('1')
    })

    // FIXME 4: cards werden nicht reingezogen
    // await user.click(screen.getByRole('button', { name: /Delete/i }))

    // await waitFor(() => {
    //   expect(deleteCard).toHaveBeenCalledWith('1')
    // })

    // await waitFor(() => {
    //   expect(mockDispatch).toHaveBeenCalledWith({
    //     type: 'DELETE_CARD',
    //     payload: '1',
    //   })
    // })
  })
})
