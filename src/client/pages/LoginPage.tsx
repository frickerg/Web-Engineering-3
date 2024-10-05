// XXX: Login-Page component for testing purposes
// TODO: Stylen, in Components packen
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../session/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { state, loginUser, logoutUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (state.error) {
      setError(state.error)
      setSuccess('')
    }

    if (state.user) {
      navigate('/')
    }
  }, [state, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    await loginUser(username, password)
      .then(() => {
        setSuccess('Login successful!')
      })
      .catch(() => {
        setError('Login failed. Please try again.')
      })
  }

  const handleLogout = () => {
    logoutUser()
    setSuccess('Logout successful!')
    setError('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Login</button>
      </form>
      {state.user && (
        <div>
          <p>Welcome, {state.user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default LoginPage
