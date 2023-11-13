import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaginaBusqueda from './components/PaginaBusqueda'
import PaginaResultados from './components/PaginaResultados'
import { Toaster } from 'react-hot-toast'
import PaginaProducto from './components/PaginaProducto'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div className="container-fluid">
      <Toaster position='top-center' reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaBusqueda />} />
          <Route path="/resultados" element={<PaginaResultados />} />
          <Route path="/producto/:id" element={<PaginaProducto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App