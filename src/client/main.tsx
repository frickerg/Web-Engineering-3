import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GameProvider } from './session/GameContext.tsx'
import { AuthProvider } from './session/AuthContext.tsx'
import App from './pages/App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GameProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GameProvider>
  </BrowserRouter>
)
