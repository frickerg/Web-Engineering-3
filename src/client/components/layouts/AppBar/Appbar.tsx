import { Link } from 'react-router-dom'
import './Appbar.css'
import CenterButton from './CenterButton'

function Appbar() {
  return (
    <div className="top-banner">
      <h1>Mimir</h1>
      <CenterButton />
      {/* <h2>Manage Cards</h2> */}
      <Link className="manage-cards" to="/cards">
        Manage Cards
      </Link>
    </div>
  )
}

export default Appbar
