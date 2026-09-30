import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FavoritesContext, type Serie } from '../context/FavoritesContext'

function SeriePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [serie, setSerie] = useState<Serie | null>(null)
  const [carregando, setCarregando] = useState(true)

  const { favoritos, adicionarFavorito, removerFavorito } =
    useContext(FavoritesContext)

  useEffect(() => {
    async function buscarSerie() {
      try {
        setCarregando(true)

        const resposta = await fetch(`https://api.tvmaze.com/shows/${id}`)
        const dados = await resposta.json()

        setSerie(dados)
      } catch (erro) {
        console.log(erro)
      } finally {
        setCarregando(false)
      }
    }

    if (id) {
      buscarSerie()
    }
  }, [id])

  if (carregando) {
    return <p>Carregando série...</p>
  }

  if (!serie) {
    return <p>Série não encontrada.</p>
  }

  const favorito = favoritos.some((item) => item.id === serie.id)

  return (
    <div>
      <button type="button" onClick={() => navigate('/')}>
        Voltar
      </button>

      {serie.image && (
        <img src={serie.image.original} alt={serie.name} />
      )}

      <h1>{serie.name}</h1>

      <div dangerouslySetInnerHTML={{ __html: serie.summary }} />

      <p>Gêneros: {serie.genres.join(', ')}</p>

      <p>Nota: {serie.rating.average ?? 'Sem nota'}</p>

      {favorito ? (
        <button type="button" onClick={() => removerFavorito(serie.id)}>
          Remover dos favoritos
        </button>
      ) : (
        <button type="button" onClick={() => adicionarFavorito(serie)}>
          Adicionar aos favoritos
        </button>
      )}
    </div>
  )
}

export default SeriePage
