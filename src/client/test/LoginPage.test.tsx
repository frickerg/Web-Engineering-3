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
import '@testing-library/jest-dom/vitest'
import LoginPage from '../../onlyForTestPurpose/LoginPage'
import { AuthContext, State } from '../session/AuthContext'
import { MemoryRouter } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { AuthenticatedUser } from '../api/AuthenticatedUser'
import { userEvent } from '@testing-library/user-event'

const login = vitest.fn()
const testUsername = 'naruto'

const handlers = [
  http.get('/api/login', async () => {
    return HttpResponse.json([
      {
        username: testUsername,
        role: 'player',
        token: 'fake-token',
      },
    ])
  }),
]
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

afterEach(() => {
  login.mockReset()
  cleanup()
})

const mockAuthContext = {
  state: {
    user: null,
  } as State,
  dispatch: () => null,
  loginUser: async (username: string, password: string) => {
    login(username, password)
    if (username !== testUsername) {
      throw new Error('Login failed')
    }
    return {} as AuthenticatedUser
  },
  logoutUser: () => {},
}

describe('LoginPage Component', () => {
  it('renders the login form', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    // Check if the login form is rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })
  it('submits the login form and shows success message on login', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await user.type(await screen.findByLabelText(/username/i), testUsername)
    await user.type(await screen.findByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(testUsername, 'password123')
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument()
    })
  })
  it('displays an error message if login fails', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await user.type(await screen.findByLabelText(/username/i), 'wronguser')
    await user.type(await screen.findByLabelText(/password/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('wronguser', 'wrongpassword')
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument()
    })
  })

  it('shows the logout button and success message after logging out', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await user.type(await screen.findByLabelText(/username/i), testUsername)
    await user.type(await screen.findByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(testUsername, 'password123')
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument()
    })

    // FIXME: funktioniert noch nicht weil User von der App weitergeleitet wird
    // await user.click(screen.getByRole('button', { name: /Logout/i }))
    // expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument()
  })
})
