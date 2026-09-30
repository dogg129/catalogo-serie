import { createContext, useState, type ReactNode } from 'react'

export type Serie = {
  id: number
  name: string
  image: {
    medium: string
    original: string
  } | null
  genres: string[]
  summary: string
  rating: {
    average: number | null
  }
}

type FavoritesContextProps = {
  favoritos: Serie[]
  adicionarFavorito: (serie: Serie) => void
  removerFavorito: (id: number) => void
}

export const FavoritesContext = createContext<FavoritesContextProps>(
  {} as FavoritesContextProps,
)

function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<Serie[]>([])

  function adicionarFavorito(serie: Serie) {
    setFavoritos((favoritosAtuais) => {
      const existe = favoritosAtuais.some((item) => item.id === serie.id)

      if (existe) {
        return favoritosAtuais
      }

      return [...favoritosAtuais, serie]
    })
  }

  function removerFavorito(id: number) {
    setFavoritos((favoritosAtuais) =>
      favoritosAtuais.filter((serie) => serie.id !== id),
    )
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoritos,
        adicionarFavorito,
        removerFavorito,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
