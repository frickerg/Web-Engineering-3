import '@testing-library/jest-dom/vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { TestApp } from './TestApp'
import Appbar from '../components/layouts/AppBar/Appbar'
import { AuthenticatedUser } from '../api/AuthenticatedUser'
import { UserRole } from '../../shared/UserRole'

const adminUser: AuthenticatedUser = {
  username: 'admin',
  role: 'admin' as UserRole,
  token: 'fake-token',
}
const playerUser: AuthenticatedUser = {
  username: 'player',
  role: 'player' as UserRole,
  token: 'fake-token',
}

afterEach(() => {
  cleanup()
})

describe('Authentication and Authorization Tests', () => {
  it('shows the Manage Cards link for admin users', async () => {
    render(
      <TestApp user={adminUser}>
        <Appbar />
      </TestApp>
    )

    await waitFor(() => {
      expect(screen.queryByText('Manage Cards')).toBeInTheDocument()
    })
  })

  it('hides the Manage Cards link for player users', async () => {
    render(
      <TestApp user={playerUser}>
        <Appbar />
      </TestApp>
    )

    await waitFor(() => {
      expect(screen.queryByText('Manage Cards')).not.toBeInTheDocument()
    })
  })
})
