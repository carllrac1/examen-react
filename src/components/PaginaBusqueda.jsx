import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const PaginaBusqueda = () => {

    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim() === '') {
            toast.error('Por favor ingrese un término de búsqueda')
            return
        }
        navigate(`/resultados?query=${query}`)
    }

    const showAll = (e) => {
        e.preventDefault()
        navigate(`/resultados`)
    }

    return (
        <div className="row d-flex justify-content-center align-items-center vh-100">
            <div className="col-12 col-md-8">
                <div className="text-center">
                    <i className="fas fa-shopping-cart fa-5x"></i>
                    <p className="fs-6 pt-2">Empieza a buscar miles de productos desde la comodidad de tu hogar</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar..."
                            aria-label="Buscar"
                            aria-describedby="search-input"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <button className="btn btn-success" type="submit" id="search-input">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </form>
                {/* ver todo */}
                <div className="text-center">
                    <a role="button" tabIndex={0} className="link" onClick={showAll}>Ver todo</a>
                </div>
            </div>
        </div>
    )
}

export default PaginaBusqueda