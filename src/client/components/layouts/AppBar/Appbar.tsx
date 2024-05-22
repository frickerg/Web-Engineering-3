import { Link } from 'react-router-dom'
import './Appbar.css'
import Button from '../../elements/Button/Button'

function Appbar() {
  return (
    <div className="top-banner flex-row">
      <h1>Mimir</h1>
      <Link to="/">
        <Button label="Home" onClick={() => {}} />
      </Link>
      <Link to="new">
        <Button label="New" onClick={() => {}} />
      </Link>
      <Link to="ongoing">
        <Button label="Ongoing" onClick={() => {}} />
      </Link>
      <Link to="end">
        <Button label="End" onClick={() => {}} />
      </Link>
      <Link to="/">Manage Cards</Link>
    </div>
  )
}

export default Appbar
