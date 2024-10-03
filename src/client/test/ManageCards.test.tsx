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
import ManageCardsPage from '../components/layouts/ManageCardDetails/ManageCardsPage'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { TestApp } from './TestApp'
import { fetchCards } from '../api'

const getCards = vitest.fn()
const addCard = vitest.fn()
const deleteCard = vitest.fn()

const handlers = [
  http.get('/api/cards', async () => {
    getCards()
    return HttpResponse.json([
      { id: '1', front: 'Card-Front-1', back: 'Card-Back-1' },
      { id: '2', front: 'Card-Front-2', back: 'Card-Back-2' },
      { id: '3', front: 'Card-Front-3', back: 'Card-Back-3' },
    ])
  }),
  http.post('/api/card', async req => {
    const json = (await req.request.json()) as object
    addCard(json)
    return HttpResponse.json({
      ...json,
      id: crypto.randomUUID(),
    })
  }),
  http.delete('/api/card/:id', async ({ params }) => {
    const { id } = params
    deleteCard(id)
    return new HttpResponse(null, { status: 204 })
  }),
]
const server = setupServer(...handlers)

afterEach(() => {
  server.resetHandlers()
  getCards.mockReset()
  addCard.mockReset()
  deleteCard.mockReset()
  cleanup()
})

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('ManageCardsPage Component', () => {
  it('displays "No Data" when there are no cards', async () => {
    render(
      <TestApp cards={[]}>
        <ManageCardsPage />
      </TestApp>
    )

    await waitFor(() => {
      expect(screen.getByText('No Data')).toBeInTheDocument()
    })
  })

  it('render page with fetched cards from server', async () => {
    render(
      <TestApp cards={await fetchCards()}>
        <ManageCardsPage />
      </TestApp>
    )

    await waitFor(() => {
      expect(getCards).toHaveBeenCalled()
    })

    expect(screen.getByText('Front ▲')).toBeInTheDocument()
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument()

    expect(screen.getByText('Card-Front-1')).toBeInTheDocument()
    expect(screen.getByText('Card-Front-2')).toBeInTheDocument()
  })

  it('handles sorting when SortHeader is clicked', async () => {
    const user = userEvent.setup()

    render(
      <TestApp cards={await fetchCards()}>
        <ManageCardsPage />
      </TestApp>
    )

    const initialCards = screen
      .getAllByText(/Card-Front-\d/)
      .map(card => card.textContent)

    const sort = await screen.findByText(/▲/i)
    await user.click(sort)

    await waitFor(() => {
      expect(screen.getByText(/▼/i)).toBeInTheDocument()
    })

    const sortedCards = screen
      .getAllByText(/Card-Front-\d/)
      .map(card => card.textContent)

    expect(sortedCards).not.toEqual(initialCards)

    const expectedSortedCards = [...initialCards].sort((a, b) => {
      return (b ?? '').localeCompare(a ?? '')
    })
    expect(sortedCards).toEqual(expectedSortedCards)
  })

  it('handles adding a new card', async () => {
    const user = userEvent.setup()
    render(
      <TestApp cards={[]}>
        <ManageCardsPage />
      </TestApp>
    )

    await user.type(screen.getByPlaceholderText('Front'), 'Card-Front-added')
    await user.type(screen.getByPlaceholderText('Back'), 'Card-Back-added')
    await user.click(screen.getByRole('button', { name: /Add/i }))

    await waitFor(() => {
      expect(addCard).toHaveBeenCalledWith({
        front: 'Card-Front-added',
        back: 'Card-Back-added',
      })
    })

    await waitFor(() => {
      expect(screen.getByText('Card-Front-added')).toBeInTheDocument()
    })
  })

  it('handles deleting a card', async () => {
    const user = userEvent.setup()

    render(
      <TestApp cards={await fetchCards()}>
        <ManageCardsPage />
      </TestApp>
    )

    await waitFor(() => {
      expect(screen.getByText('Card-Front-1')).toBeInTheDocument()
    })

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i })
    await user.click(deleteButtons[0])

    await waitFor(() => {
      expect(deleteCard).toHaveBeenCalledWith('1')
    })

    await waitFor(() => {
      expect(screen.queryByText('Card-Front-1')).not.toBeInTheDocument()
    })
  })
})
