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
import LoginPage from '../../onlyForTestPurpose/LoginPage'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { TestApp } from './TestApp'
import Appbar from '../components/layouts/AppBar/Appbar'

const userAdmin = { userName: 'admin-user', password: 'admin-password' }
const userPlayer = { userName: 'player-user', password: 'player-password' }
const userUnknown = { userName: 'unknown', password: 'wrong-password' }

const login = vitest.fn()
const mockedNavigate = vitest.fn()

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

    if (username == userAdmin.userName) {
      return HttpResponse.json({
        username: userAdmin,
        role: 'admin',
        token: 'fake-token',
      })
    } else if (username == userPlayer.userName) {
      return HttpResponse.json({
        username: userPlayer,
        role: 'player',
        token: 'fake-token',
      })
    } else {
      return HttpResponse.json({ error: 'Not Authorized' }, { status: 401 })
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

  it('admin login shows Manage Cards; logs out', async () => {
    render(
      <TestApp>
        <Appbar />
        <LoginPage />
      </TestApp>
    )

    const user = userAdmin
    ExpectUserIsNotShownInAppbar(user.userName)
    ExpectManageCardsIsNotShownInAppbar()
    await loginUser(user.userName, user.password)
    await ExpectSuccessOnLogin()
    ExpectUserIsShownInAppbar(user.userName)
    ExpectManageCardsIsShownInAppbar()
    await logoutUser()
    ExpectUserIsNotShownInAppbar(user.userName)
    ExpectManageCardsIsNotShownInAppbar()

    expect(screen.queryByText('Manage Cards')).not.toBeInTheDocument()
  })

  it('player login shows username without Manage Cards; logs out', async () => {
    render(
      <TestApp>
        <Appbar />
        <LoginPage />
      </TestApp>
    )
    const user = userPlayer
    ExpectUserIsNotShownInAppbar(user.userName)
    ExpectManageCardsIsNotShownInAppbar()
    await loginUser(user.userName, user.password)
    await ExpectSuccessOnLogin()
    ExpectUserIsShownInAppbar(user.userName)
    ExpectManageCardsIsNotShownInAppbar()
    await logoutUser()
    ExpectUserIsNotShownInAppbar(user.userName)
    ExpectManageCardsIsNotShownInAppbar()
  })

  it('shows error message on login failure', async () => {
    render(
      <TestApp>
        <LoginPage />
      </TestApp>
    )

    const user = userUnknown
    await loginUser(user.userName, user.password)
    await ExpectFailureOnLogin()
  })
})

const loginUser = async (userName: string, password: string) => {
  const userEventInstance = userEvent.setup()

  await userEventInstance.type(
    await screen.findByLabelText(/username/i),
    userName
  )
  await userEventInstance.type(
    await screen.findByLabelText(/password/i),
    password
  )
  await userEventInstance.click(screen.getByRole('button', { name: /login/i }))

  await waitFor(() => {
    expect(login).toHaveBeenCalledWith(userName, password)
  })
}

const logoutUser = async () => {
  await userEvent.setup().click(screen.getByRole('button', { name: 'Logout' }))
}

const ExpectSuccessOnLogin = async () => {
  await waitFor(() => {
    expect(screen.getByText(/Login successful/i)).toBeInTheDocument()
    expect(mockedNavigate).toHaveBeenCalledWith('/')
  })
}

const ExpectFailureOnLogin = async () => {
  await waitFor(() => {
    expect(screen.getByText(/Login failed/i)).toBeInTheDocument()
    expect(mockedNavigate).not.toHaveBeenCalled()
  })
}

const ExpectUserIsShownInAppbar = (userName: string) => {
  waitFor(() => {
    expect(screen.queryByText(userName)).toBeInTheDocument()
  })
}

const ExpectUserIsNotShownInAppbar = (userName: string) => {
  waitFor(() => {
    expect(screen.queryByText(userName)).not.toBeInTheDocument()
  })
}

const ExpectManageCardsIsShownInAppbar = () => {
  waitFor(() => {
    expect(screen.queryByText('Manage Cards')).toBeInTheDocument()
  })
}

const ExpectManageCardsIsNotShownInAppbar = () => {
  waitFor(() => {
    expect(screen.queryByText('Manage Cards')).not.toBeInTheDocument()
  })
}
