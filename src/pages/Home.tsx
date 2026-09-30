import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import type { Serie } from '../context/FavoritesContext'
import './Catalogo.css'

function Home() {
  const [series, setSeries] = useState<Serie[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarSeries() {
      try {
        const resposta = await fetch('https://api.tvmaze.com/shows')
        const dados = await resposta.json()

        setSeries(dados)
      } catch (erro) {
        console.log(erro)
      } finally {
        setCarregando(false)
      }
    }

    buscarSeries()
  }, [])

  if (carregando) {
    return <p>Carregando séries...</p>
  }

  return (
    <main className="catalog-page">
      <h1>Séries</h1>

      <section className="catalog-grid" aria-label="Catálogo de séries">
        {series.map((serie) => (
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
            </Link>
            <div className="show-card-info">
              <Link className="show-title" to={`/serie/${serie.id}`}>
                {serie.name}
              </Link>
              <p className="show-genres">
                {serie.genres.length > 0 ? serie.genres.join(' · ') : 'Série'}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Home
