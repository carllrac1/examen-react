import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import './PaginaResultados.css'

const PaginaResultados = () => {

    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()
    const query = searchParams.get('query')
    const [productos, setProductos] = useState([])

    const search = async () => {
        const response = await fetch(`https://examen-production-0276.up.railway.app/api/productos?q=${query ?? ''}`)
        const data = await response.json()
        if (data.error) {
            navigate('/')
            return
        }
        setProductos(data.data)
    }

    const seacrchById = (id) => {
        navigate(`/producto/${id}`)
    }

    useEffect(() => {
        search()
    }, [query])

    return (
        <div className='row justify-content-center'>
            <div className="col-12 col-sm-8">
                <div className="row d-flex align-items-center">
                    <div className="col-2 text-center">
                        <a href="#" role='button' style={{ all: 'unset', cursor: 'pointer' }}
                            onClick={(e) => {
                                e.preventDefault()
                                navigate('/')
                            }}
                        >
                            <i className="fas fa-home fa-2x" style={{color: 'green'}}></i>
                        </a>
                    </div>
                    <div className="col-10 pt-3">
                        <div className="input-group mb-3">
                            <input

                                type="text"
                                className="form-control"
                                placeholder="Buscar..."
                                aria-label="Buscar"
                                aria-describedby="search-input"
                                value={query ?? ''}
                                onChange={e => navigate(`/resultados?query=${e.target.value}`)}
                            />
                        </div>

                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6" if={query}>
                                {
                                    (query) && (
                                        <p className="text-muted">Resultados para <strong>{query}</strong></p>
                                    )
                                }
                            </div>
                            <div className="col-6 text-end">
                                <p className="text-muted">{productos.length} resultados</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-8">
                {
                    productos.map((producto, index) => (
                        <div className="card mb-3" key={index}>
                            <div className="row g-0 p-2">
                                <div className="col-12 col-md-4 d-flex align-items-center">
                                    <img src={producto.thumbnail} className="img-fluid rounded" alt={producto.title} />
                                </div>
                                <div className="col-12 col-md-8">
                                    <div className="card-body">
                                        {/* mostrar titulo y categoria en la misma linea */}
                                        <div className="row g-0 pb-2">
                                            <div className="col-12">
                                                <h5 className="card-title">{producto.title}</h5>
                                            </div>
                                            <div className="col-12">
                                                <p className="card-text"><small className="text-muted">{producto.category}</small></p>
                                            </div>
                                        </div>
                                        <p className="card-text fs-6 multi-line">{producto.description}</p>
                                        <p className="card-text"><small className="text-muted">${parseFloat(producto.price).toLocaleString()}</small></p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-muted">
                                <div className="row">
                                    <div className="col-6">
                                        {
                                            [...Array(Math.round(parseInt(producto.rating) / 2)).keys()].map((i) => (
                                                <i key={i} className="fas fa-star" style={{color: 'yellowgreen'}}></i>
                                            ))
                                        }
                                        {
                                            [...Array(5 - Math.round(parseInt(producto.rating) / 2)).keys()].map((i) => (
                                                <i key={i} className="far fa-star" style={{color: 'yellowgreen'}}></i>
                                            ))
                                        }
                                    </div>
                                    <div className="col-6 text-end">
                                        <button className="btn btn-success"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                seacrchById(producto.id)
                                            }}
                                        >
                                            Ver más
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PaginaResultados