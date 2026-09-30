import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { FavoritesContext } from '../context/FavoritesContext'
import './Catalogo.css'

function Favoritos() {
  const { favoritos, removerFavorito } = useContext(FavoritesContext)

  return (
    <main className="catalog-page">
      <h1>Favoritos</h1>

      {favoritos.length === 0 ? (
        <p>Nenhuma série favorita.</p>
      ) : (
        <section className="catalog-grid" aria-label="Séries favoritas">
          {favoritos.map((serie) => (
            <article className="show-card" key={serie.id}>
              <Link
                className="show-poster"
                to={`/serie/${serie.id}`}
                aria-label={`Ver detalhes de ${serie.name}`}
              >
                {serie.image ? (
                  <img src={serie.image.medium} alt={serie.name} loading="lazy" />
                ) : (
                  <span className="poster-fallback">Imagem indisponível</span>
                )}
                {serie.rating.average !== null && (
                  <span className="poster-rating">{serie.rating.average}</span>
                )}
                <span className="poster-action">Ver detalhes</span>
              </Link>
              <div className="show-card-info">
                <Link className="show-title" to={`/serie/${serie.id}`}>
                  {serie.name}
                </Link>
                <button
                  className="show-remove"
                  type="button"
                  onClick={() => removerFavorito(serie.id)}
                >
                  Remover dos favoritos
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default Favoritos
