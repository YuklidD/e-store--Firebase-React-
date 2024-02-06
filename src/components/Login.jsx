import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../components/config/Config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './css/login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const login = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setError('');
                history.push('/');
            })
            .catch(err => {
                setError("The Email or Password is Incorrect");
            });
    };

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4" style={{color: '#007bff'}}>Login</h2>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form autoComplete="off" onSubmit={login}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className="input-group-text" id="email-addon"><i className="fas fa-envelope"></i></span>
                                        <input type="email" className="form-control" id="email" aria-describedby="email-addon" required
                                               onChange={(e) => setEmail(e.target.value)} value={email} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text" id="password-addon"><i className="fas fa-lock"></i></span>
                                        <input type="password" className="form-control" id="password" aria-describedby="password-addon" required
                                               onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                            <div className="text-center mt-3">
                                <span>Don't have an account? <Link to="/signup" className="text-primary">Register Here</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
