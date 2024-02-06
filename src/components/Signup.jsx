import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from '../components/config/Config';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc'; // For Google icon
import './css/signup.css'; 


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSignup = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((credential) => {
                return setDoc(doc(db, 'SignedUpUsersData', credential.user.uid), {
                    Name: name,
                    Email: email,
                });
            })
            .then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                history.push('/login');
            })
            .catch(err => setError(err.message));
    };

    const handleGoogleSignup = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const userRef = doc(db, 'SignedUpUsersData', user.uid);
                return setDoc(userRef, {
                    Name: user.displayName || 'No Name',
                    Email: user.email,
                    Cart: []
                }, { merge: true });
            })
            .then(() => {
                history.push('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h2 className="text-center mb-4" style={{color: '#17a2b8'}}>Sign Up</h2>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form autoComplete='off' onSubmit={handleSignup}>
                                <div className="mb-3">
                                    <label htmlFor="Name" className="form-label">Name</label>
                                    <input type="text" className="form-control" required 
                                        onChange={(e) => setName(e.target.value)} value={name} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Email" className="form-label">Email</label>
                                    <input type="email" className="form-control" required 
                                        onChange={(e) => setEmail(e.target.value)} value={email}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" required 
                                        onChange={(e) => setPassword(e.target.value)} value={password}/>
                                </div>
                                <button type="submit" className='btn btn-primary w-100'>Register</button>
                            </form>
                            <hr />
                            <button onClick={handleGoogleSignup} className='btn btn-light border w-100 mt-3'>
                                <FcGoogle size={24}/> Sign up with Google
                            </button>
                            <div className="text-center mt-3">
                                Already have an account? <Link to='/login' className="text-primary">Login Here</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
