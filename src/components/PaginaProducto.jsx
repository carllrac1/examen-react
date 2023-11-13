import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import NotFound from './NotFound'

const PaginaProducto = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [producto, setProducto] = useState(undefined)

    const [carga, setCarga] = useState(true)

    const search = async () => {

        const response = await fetch(`https://examen-production-0276.up.railway.app/api/productos/${id}`)

        if (response.status === 404) {
            setCarga(false)
            return
        }

        const data = await response.json()

        setProducto(data.data)

        setCarga(false)
    }

    useEffect(() => {
        search()
    }, [id])


    return (
        (!carga && producto) ?
            (<div className="container">
                <div className="row justify-content-center p-5">

                    <div className="col-12 col-md-10">
                        {/* mostrar categoria */}

                        <div className="row d-flex">
                            <div className="col-12 col-sm-4">
                                <p className="text-muted">Categoría: {producto.category}</p>
                            </div>
                            <div className="col-12 col-sm-8 text-sm-end">
                                <a href="#" role='button'
                                    onClick={(e) => {
                                        //a la ruta anterior
                                        e.preventDefault()
                                        navigate(-1)
                                    }}
                                >
                                    Volver atrás
                                </a>

                            </div>
                        </div>

                        <hr />
                        <div id="carrusel-1" className="carousel slide" data-bs-touch="false">
                            <div className="carousel-inner">
                                {
                                    producto.imagenes?.map((imagen, index) => (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                            <img src={imagen.url} className="d-block w-100" alt="..." />
                                        </div>
                                    ))
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carrusel-1" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carrusel-1" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="row pt-4">
                            <div className="col-md-8 col-12 pe-5 text-justify">
                                <div className="row d-flex">
                                    <div className="col-12 col-lg-6 order-1 order-lg-0">
                                        <div className="d-inline h6">
                                            Precio: ${parseFloat(producto.price).toLocaleString()}
                                            <span className="badge bg-success ms-2">
                                                {Math.round(parseFloat(producto.discount_percentage))}% OFF
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6 text-lg-end order-0 order-lg-1">
                                        {
                                            [...Array(Math.round(parseInt(producto.rating) / 2)).keys()].map((i) => (
                                                <i key={i} className="fas fa-star" style={{ color: 'yellowgreen' }}></i>
                                            ))
                                        }
                                        {
                                            [...Array(5 - Math.round(parseInt(producto.rating) / 2)).keys()].map((i) => (
                                                <i key={i} className="far fa-star" style={{ color: 'yellowgreen' }}></i>
                                            ))
                                        }
                                    </div>

                                </div>
                                <h1 className="display-4">{producto.title}</h1>
                                <p className="lead">{producto.description}</p>
                            </div>
                            <div className="col-md-4">
                                {/* Detalles (marca, stock) */}
                                <div className="table">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Marca</strong></td>
                                                    <td>{producto.brand}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Stock</strong></td>
                                                    <td>{parseInt(producto.stock)} piezas</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="2" className='text-center'>
                                                        <button className="btn btn-success btn-md btn-block">
                                                            <i className="fas fa-shopping-cart"></i> Agregar al carrito
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) : (

                (carga && !producto) ? (
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center p-5 vh-100">
                            <div className="col-12 col-md-10">
                                <div className="text-center">
                                    <i className="fas fa-spinner fa-5x fa-spin"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <NotFound />
                )

            )
    )
}

export default PaginaProducto