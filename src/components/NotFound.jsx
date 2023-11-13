import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate()

    const goHome = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <div className="container">
            <div className="row d-flex align-items-center vh-100">
                <div className="col-md-6 offset-md-3 text-center mt-5">
                    <h1 className="display-4">Error 404</h1>
                    <p className="lead">Lo sentimos, la página que estás buscando no se encuentra.</p>
                    <a role='button' className="btn btn-primary" onClick={goHome}>Volver a la página de inicio</a>
                </div>
            </div>
        </div>
    )
}

export default NotFound