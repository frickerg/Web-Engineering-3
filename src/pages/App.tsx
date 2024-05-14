import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './Layout'
import Content from '../components/layouts/Content/Content'
import New from '../components/layouts/GamePage/New'
import Ongoing from '../components/layouts/GamePage/Ongoing'
import End from '../components/layouts/GamePage/End'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Content />} />
        <Route path="new" element={<New />} />
        <Route path="ongoing" element={<Ongoing />} />
        <Route path="end" element={<End />} />
      </Route>
    </Routes>
  )
}

export default App
