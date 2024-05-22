import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CardProvider } from '../api/CardContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CardProvider>
      <App />
    </CardProvider>
  </BrowserRouter>
)
