import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../static/signup.css';

function Signup() {
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })

    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const navigate = useNavigate();


    const handlesubmit = async (e) => {
        e.preventDefault();
        if(username == '' || password == '' || pass2 == ''){
            alert('All fields are necessary');
            return;
        }
        if(username == /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/){
            alert('username not a valid form')
        }
        if(password.length < 8 || username.length >= 15 || username.length <= 3){
            alert('Password should have atleast 8 char and username between 3 to 10 char');
            return;
        }
        if (password !== pass2) {
            alert("password not matched");
            return;
        }
        try {
            let result = await fetch('http://localhost:8000/api/auth/signup', {
                method: "post",
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await result.json();
            if (result.status === 201) {
                navigate('/login');
                alert('User Created');
            }
            else {
                alert(response.error.message);
                console.log(response)
            }
            setUsername('');
            setPass('');
            setPass2('');

        } catch (err) {
            console.error('Error:', err);
        }

    }

    return (
        <section className="vh-100 bg-image mt-0"
            style={{ backgroundImage: " url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp') " }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3" id="newclass">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: " 15px" }}>
                                <div className="card-body p-5">
                                    <h3 className="text-uppercase text-center mb-2">Create an account</h3>

                                    <form onSubmit={handlesubmit} >

                                        <div className="form-outline mb-2">
                                            <input type="text" id="form3Example1cg" className="form-control form-control-sm" value={username} onChange={e => setUsername(e.target.value)} />
                                            <label className="form-label" htmlFor="form3Example1cg">Username</label>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type="password" id="form3Example4cg" className="form-control form-control-sm" value={password} onChange={e => setPass(e.target.value)} />
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type="password" id="form3Example4cdg" className="form-control form-control-sm" value={pass2} onChange={e => setPass2(e.target.value)} />
                                            <label className="form-label" htmlFor="form3Example4cdg">Repeat password</label>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="submit"
                                                className="btn btn-success btn-block btn-sm gradient-custom-4 text-body">Register</button>
                                        </div>

                                        <p className="text-center text-muted  mb-0">Have already an account? <Link to="/login"
                                            className="fw-bold text-body"><u>Login here</u></Link></p>

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

export default Signup;