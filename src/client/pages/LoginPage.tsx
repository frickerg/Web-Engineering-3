// XXX: Login-Page component for testing purposes
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../session/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LayoutContainer } from '../components/elements/Container/components/LayoutContainer'
import { TitleHeader as Title } from '../components/typography/headings/TitleHeader'
import { TopBannerLeftContainer as HeaderContainer } from '../components/elements/Container/components/TopBannerLeftContainer'
import { TopBannerContainer as AppbarContainer } from '../components/elements/Container/components/TopBannerContainer'
import { Container } from '../components/elements/Container/Container'
import { InputLogin } from '../components/elements/Input/components/InputLogin'
import { Button } from '../components/elements/Button/Button'

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

  //TODO Passt so mit <Container style={{ [...] }}> ? Die Entscheidung ist ein Kompromiss pro Lesbarkeit zwischen atomic Components beinahe ohne Inhalt anzulegen oder rohen div's immer dieselben styles zu übergeben
  return (
    <LayoutContainer>
      <AppbarContainer>
        <HeaderContainer>
          <Title style={{ paddingLeft: '24px' }}>Mimir</Title>
        </HeaderContainer>
      </AppbarContainer>
      <Container style={{ margin: '24px' }}>  
        <form onSubmit={handleSubmit}>
          <Container style={{ padding: '0px 24px 6px' }}>
            <label htmlFor="username">Username:</label>
            <InputLogin
              placeholder="Bitte Usernamen eingeben"
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </Container>
          <Container style={{ padding: '6px 24px' }}>
            <label htmlFor="password">Password:</label>
            <InputLogin
              placeholder="Bitte gib dein Passwort ein"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Container>
          <Container style={{ padding: '24px' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <Button type="submit">Login</Button>
          </Container>
        </form>

        {state.user && (
          <div>
            <p>Welcome, {state.user.username}!</p>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </Container>
    </LayoutContainer>
  )
}

export default LoginPage
