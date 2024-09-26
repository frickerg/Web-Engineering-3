import ReactDOM from 'react-dom/client'
// import App from './pages/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GameProvider } from './session/GameContext.tsx'
import { AuthProvider } from './session/AuthContext.tsx'
import LoginPage from './components/layouts/LoginPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <GameProvider>
        <LoginPage />
        {/* FIXME  <App /> */}
      </GameProvider>
    </AuthProvider>
  </BrowserRouter>
)
