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
import { startNewGame } from '../api'
import OngoingGamePage from '../components/layouts/GamePage/OngoingGamePage'
import StartNewGamePage from '../components/layouts/GamePage/StartNewGamePage'

const token = 'fake-token'

const startGame = vitest.fn()
const submitAnswer = vitest.fn()

const handlers = [
  http.post('/api/startGame', async () => {
    startGame()
    return HttpResponse.json({
      currentCard: { id: '1', front: 'Card-Front-1' },
      gameSize: 3,
      status: 'started',
    })
  }),
  http.post('/api/submitAnswer', async req => {
    const { answer } = (await req.request.json()) as {
      answer: string
    }
    submitAnswer(answer)
    let isCorrect = false
    if (answer === 'Card-Back-1') {
      isCorrect = true
    }
    return HttpResponse.json({
      isCorrect: isCorrect,
      nextCard: { id: '2', front: 'Card-Front-2' },
      progress: 33,
    })
  }),
]
const server = setupServer(...handlers)

afterEach(() => {
  server.resetHandlers()
  startGame.mockReset()
  submitAnswer.mockReset()
  cleanup()
})

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('Game Component', () => {
  it('shows "No game running" when StartNewGamePage is loaded without an active game', async () => {
    render(
      <TestApp>
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
      <TestApp>
        <StartNewGamePage />
      </TestApp>
    )

    await user.click(screen.getByRole('button', { name: /Start New Game/i }))

    await waitFor(() => {
      expect(startGame).toHaveBeenCalledOnce()
    })

    await waitFor(() => {
      expect(screen.getByText('Continue Running Game')).toBeInTheDocument()
    })
  })

  it('displays "No cards found" when OngoingGamePage is loaded without any cards', async () => {
    render(
      <TestApp>
        <OngoingGamePage />
      </TestApp>
    )

    await waitFor(() => {
      expect(screen.getByText('No cards found')).toBeInTheDocument()
    })
  })

  it('updates progress and moves to the next card when the correct answer is submitted', async () => {
    const user = userEvent.setup()
    const { currentCard, gameSize } = await startNewGame(token)

    render(
      <TestApp game={{ gameCards: [currentCard], gameSize }}>
        <OngoingGamePage />
      </TestApp>
    )

    await waitFor(() => {
      expect(startGame).toHaveBeenCalledOnce()
    })

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
    const { currentCard, gameSize } = await startNewGame(token)

    render(
      <TestApp game={{ gameCards: [currentCard], gameSize }}>
        <OngoingGamePage />
      </TestApp>
    )

    await waitFor(() => {
      expect(startGame).toHaveBeenCalledOnce()
    })

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
    const { currentCard, gameSize } = await startNewGame(token)

    render(
      <TestApp game={{ gameCards: [currentCard], gameSize }}>
        <OngoingGamePage />
      </TestApp>
    )

    await waitFor(() => {
      expect(startGame).toHaveBeenCalledOnce()
    })

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
