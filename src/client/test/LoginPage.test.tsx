import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import {
  describe,
  it,
  expect,
  vitest,
  afterEach,
  afterAll,
  beforeAll,
} from 'vitest'
import React from 'react'
import LoginPage from '../../onlyForTestPurpose/LoginPage'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { TestApp } from './TestApp'

const login = vitest.fn()
const mockedNavigate = vitest.fn()
const testUsername = 'naruto'

vitest.mock('react-router-dom', async () => {
  const actual = await vitest.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  }
})

const handlers = [
  http.post('/api/login', async req => {
    const { username, password } = (await req.request.json()) as {
      username: string
      password: string
    }
    login(username, password)
    if (username !== testUsername) {
      return HttpResponse.json({ error: 'Not Authorized' }, { status: 401 })
    } else {
      return HttpResponse.json({
        username: testUsername,
        role: 'player',
        token: 'fake-token',
      })
    }
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

afterEach(() => {
  login.mockReset()
  mockedNavigate.mockReset()
  server.resetHandlers()
  cleanup()
})

describe('LoginPage Component', () => {
  it('renders the login form', () => {
    render(
      <TestApp>
        <LoginPage />
      </TestApp>
    )

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('submits the login form and shows success message on login', async () => {
    const user = userEvent.setup()
    render(
      <TestApp>
        <LoginPage />
      </TestApp>
    )
    await user.type(await screen.findByLabelText(/username/i), testUsername)
    await user.type(await screen.findByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(testUsername, 'password123')
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument()
    })

    expect(mockedNavigate).toHaveBeenCalledWith('/')
  })

  it('displays an error message if login fails', async () => {
    const user = userEvent.setup()
    render(
      <TestApp>
        <LoginPage />
      </TestApp>
    )
    await user.type(await screen.findByLabelText(/username/i), 'wrong-user')
    await user.type(await screen.findByLabelText(/password/i), 'wrong-password')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('wrong-user', 'wrong-password')
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument()
    })

    expect(mockedNavigate).not.toHaveBeenCalled()
  })
})
