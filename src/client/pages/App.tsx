import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './Layout'
import Content from '../components/layouts/Content/Content'
import NewPage from '../components/layouts/GamePage/NewPage'
import Ongoing from '../components/layouts/GamePage/Ongoing'
import EndPage from '../components/layouts/GamePage/EndPage'
import DetailPage from '../components/layouts/GamePage/DetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NewPage />} />
        <Route path="cards" element={<Content />} />
        <Route path="ongoing" element={<Ongoing />} />
        <Route path="cards/details/:cardId" element={<DetailPage />} />
        <Route path="end" element={<EndPage />} />
      </Route>
    </Routes>
  )
}

export default App
