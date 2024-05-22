import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CardProvider } from '../api/CardContext'
import { GameProvider } from '../api/GameContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CardProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </CardProvider>
  </BrowserRouter>
)
