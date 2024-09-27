import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GameProvider } from './session/GameContext.tsx'
import { AuthProvider } from './session/AuthContext.tsx'
import LoginPage from '../onlyForTestPurpose/LoginPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <GameProvider>
        <LoginPage />
        {/* FIXME anstelle LoginPage sollte wieder App gestartet werden ->  <App /> */}
      </GameProvider>
    </AuthProvider>
  </BrowserRouter>
)
