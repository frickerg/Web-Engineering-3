import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  vitest,
  afterEach,
  afterAll,
  beforeAll,
} from 'vitest'
import '@testing-library/jest-dom/vitest'
import LoginPage from '../onlyForTestPurpose/LoginPage'
import { AuthContext, State } from '../client/session/AuthContext'
import { MemoryRouter } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

// Mock AuthContext values
const mockLoginUser = vi.fn()
const mockLogoutUser = vi.fn()
// server setup cut off
const login = vitest.fn()

// Mock the `login` function
vi.mock('../client/api', () => ({
  login: vi.fn(),
}))

const handlers = [
  http.get('../client/api/login', async () => {
    return HttpResponse.json([{ id: 'id1', text: 'Todo1', state: 'pending' }])
  }),
]
const server = setupServer(...handlers)

const mockAuthContext = {
  state: {
    user: null,
  } as State,
  dispatch: () => null,
  loginUser: mockLoginUser,
  logoutUser: mockLogoutUser,
}

describe('LoginPage Component', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())

  beforeEach(() => {
    mockAuthContext.loginUser.mockClear()
    mockAuthContext.logoutUser.mockClear()
    vi.resetAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

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
    mockLoginUser.mockResolvedValueOnce({ username: 'naruto' })

    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'naruto' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    })

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    // Expect loginUser to have been called with correct arguments
    expect(mockLoginUser).toHaveBeenCalledWith('naruto', 'password123')

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument()
    })
  })

  it('displays an error message if login fails', async () => {
    mockAuthContext.state.error = 'Invalid credentials'
    mockLoginUser.mockRejectedValueOnce(new Error('Invalid credentials'))

    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'wronguser' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    })

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Login/i }))

    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/Login failed./i)).toBeInTheDocument()
    })
  })

  it('shows the logout button and success message after logging out', () => {
    mockAuthContext.state.user = {
      username: 'naruto',
      role: 'player',
      token: 'secret',
    }

    login.mockResolvedValueOnce({
      username: 'naruto',
      role: 'player',
      token: 'secret',
    })

    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <LoginPage />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    // Check if the welcome message and logout button are displayed
    expect(screen.getByText(/Welcome, Naruto!/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument()

    // Simulate logout
    fireEvent.click(screen.getByRole('button', { name: /Logout/i }))

    // Check if the success message is displayed after logging out
    expect(mockLogoutUser).toHaveBeenCalled()
    expect(screen.getByText(/Logout successful/i)).toBeInTheDocument()
  })
})
