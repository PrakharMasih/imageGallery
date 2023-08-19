import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    const logout = () => {
        const apilogout = async() => {
            let result = await fetch('http://localhost:8000/api/auth/logout');
            result = await result.json();
            console.log(result);
        }
        apilogout();
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid ">
                <Link className="navbar-brand" to="/home">Gallery</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {
                            auth ?
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/upload" >Upload</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login" onClick={logout} >logout</Link>
                                    </li>
                                </>

                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Signup">Signup</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">login</Link>
                                    </li>
                                </>
                        }




                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar