import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../static/login.css';

function Login() {

    const [password, setPass] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const mystyle = {
        "backgroundImage": " url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp') "
    }

    const mystyle2 = {
        "borderRadius": " 15px"
    }

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch('http://localhost:8000/api/auth/login', {
            method: "post",
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // const data = await result.json();
        // console.log(data)
        if (result.status === 200 ) {
            localStorage.setItem('user', username);
            navigate('/');
        }
        else {
            alert("User not found");
        }
        setUsername('');
        setPass('');
    }

    return (
        <section className="vh-100 bg-image mt-0"
            style={mystyle}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3" id="newclass">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={mystyle2}>
                                <div className="card-body p-5">
                                    <h3 className="text-uppercase text-center mb-2">Login to account</h3>

                                    <form onSubmit={handleSubmit} >

                                        <div className="form-outline mb-4">
                                            <label className="form-label " htmlFor="form3Example3cg">Username</label>
                                            <input type="text" id="form3Example3cg" className="form-control form-control-sm" value={username} onChange={e => setUsername(e.target.value)} />

                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                            <input type="password" id="form3Example4cg" className="form-control form-control-sm" value={password} onChange={e => setPass(e.target.value)} />

                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit"
                                                className="btn btn-success btn-block btn-sm mt-3 mb-3 gradient-custom-4 text-body">Login</button>
                                        </div>

                                        <p className="text-center text-muted  mb-0">Not have an account? <Link to="/signup"
                                            className="fw-bold text-body"><u>Signup</u></Link></p>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Login;