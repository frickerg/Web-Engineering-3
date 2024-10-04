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
} from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { TestApp } from './TestApp'
import { fetchCards } from '../api'
import OngoingGamePage from '../components/layouts/GamePage/OngoingGamePage'
import StartNewGamePage from '../components/layouts/GamePage/StartNewGamePage'

const getCards = vitest.fn()
const getGameSize = vitest.fn()
const submitAnswer = vitest.fn()

const handlers = [
  http.get('/api/cards', async () => {
    getCards()
    return HttpResponse.json([
      { id: '1', front: 'Card-Front-1', back: 'Card-Back-1' },
      { id: '2', front: 'Card-Front-2', back: 'Card-Back-2' },
      { id: '3', front: 'Card-Front-3', back: 'Card-Back-3' },
    ])
  }),
  http.get('/api/gameSize', async () => {
    getGameSize()
    return HttpResponse.json({
      gameSize: 3,
    })
  }),
  http.post('/api/submitAnswer', async req => {
    const { answer } = (await req.request.json()) as {
      answer: string
    }
    submitAnswer(answer)
    return HttpResponse.json({ isAccepted: answer === 'Card-Back-1' })
  }),
]
const server = setupServer(...handlers)

afterEach(() => {
  server.resetHandlers()
  getCards.mockReset()
  getGameSize.mockReset()
  submitAnswer.mockReset()
  cleanup()
})

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('Game Component', () => {
  it('shows "No game running" when StartNewGamePage is loaded without an active game', async () => {
    render(
      <TestApp cards={[]}>
        <StartNewGamePage />
      </TestApp>
    )

    await waitFor(() => {
      expect(screen.getByText('No game running')).toBeInTheDocument()
    })
  })

  it('starts a new game when the "Start New Game" button is clicked and updates the game state', async () => {
    const user = userEvent.setup()
    render(
      <TestApp cards={[]}>
        <StartNewGamePage />
      </TestApp>
    )

    await user.click(screen.getByRole('button', { name: /Start New Game/i }))

    await waitFor(() => {
      expect(getGameSize).toHaveBeenCalledOnce()
    })

    await waitFor(() => {
      expect(screen.getByText('Continue Running Game')).toBeInTheDocument()
    })
  })

  it('displays "No cards found" when OngoingGamePage is loaded without any cards', async () => {
    render(
      <TestApp cards={[]}>
        <OngoingGamePage />
      </TestApp>
    )

    await waitFor(() => {
      expect(screen.getByText('No cards found')).toBeInTheDocument()
    })
  })

  it('updates progress and moves to the next card when the correct answer is submitted', async () => {
    const user = userEvent.setup()

    render(
      <TestApp cards={await fetchCards()}>
        <OngoingGamePage />
      </TestApp>
    )

    await waitFor(() => {
      expect(screen.queryByText('Progress: 0%')).toBeInTheDocument()
      expect(screen.getByText('Card-Front-1')).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText('Answer'), 'Card-Back-1')
    await user.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(submitAnswer).toHaveBeenCalledWith('Card-Back-1')
    })

    await waitFor(() => {
      expect(screen.queryByText('Progress: 33%')).toBeInTheDocument()
      expect(screen.getByText('Card-Front-2')).toBeInTheDocument()
    })
  })

  it('updates progress and moves to the next card when an incorrect answer is submitted', async () => {
    const user = userEvent.setup()

    render(
      <TestApp cards={await fetchCards()}>
        <OngoingGamePage />
      </TestApp>
    )

    await waitFor(() => {
      expect(screen.queryByText('Progress: 0%')).toBeInTheDocument()
      expect(screen.getByText('Card-Front-1')).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText('Answer'), 'wrong answer')
    await user.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(submitAnswer).toHaveBeenCalledWith('wrong answer')
    })

    await waitFor(() => {
      expect(screen.queryByText('Progress: 33%')).toBeInTheDocument()
      expect(screen.getByText('Card-Front-2')).toBeInTheDocument()
    })
  })

  it('resets the game and shows "No cards found" when the game is deleted', async () => {
    const user = userEvent.setup()

    render(
      <TestApp cards={await fetchCards()}>
        <OngoingGamePage />
      </TestApp>
    )

    await waitFor(() => {
      expect(screen.queryByText('Progress: 0%')).toBeInTheDocument()
      expect(screen.getByText('Card-Front-1')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Delete Game/i }))

    await waitFor(() => {
      expect(screen.queryByText('No cards found')).toBeInTheDocument()
    })
  })
})
