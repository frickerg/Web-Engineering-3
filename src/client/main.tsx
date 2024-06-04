import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GameProvider } from './session/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GameProvider>
      <App />
    </GameProvider>
  </BrowserRouter>
)
