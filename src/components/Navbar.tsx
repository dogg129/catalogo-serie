import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { FavoritesContext } from '../context/FavoritesContext'

function Navbar() {
  const { favoritos } = useContext(FavoritesContext)

  return (
    <nav>
      <Link to="/">Séries</Link>

      <Link to="/favoritos">Favoritos ({favoritos.length})</Link>
    </nav>
  )
}

export default Navbar
