import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Serie from './pages/Serie'
import Favoritos from './pages/Favoritos'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/serie/:id" element={<Serie />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </>
  )
}

export default App
