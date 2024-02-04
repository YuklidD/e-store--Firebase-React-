import React, { useState } from 'react';
import { auth, db } from '../components/config/Config';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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

    return (
        <div className='container'>
            <br />
            <h2>Sign Up</h2>
            <hr />
            <form autoComplete='off' className='form-group' onSubmit={handleSignup}>
                <label htmlFor="Name">Name</label>
                <br />
                <input type="text" className="form-control" required 
                    onChange={(e) => setName(e.target.value)} value={name} />
                <br />
                <label htmlFor="Email">Email</label>
                <br />
                <input type="email" className="form-control" required 
                    onChange={(e) => setEmail(e.target.value)} value={email}/>
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input type="password" className="form-control" required 
                    onChange={(e) => setPassword(e.target.value)} value={password}/>
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>REGISTER</button>
                <br />
            </form>
            {error && <div className='error-msg'>{error}</div>}
            <span>Already have an account? Login 
                <Link to='/login'> Here</Link>
            </span>
        </div>
    );
};

export default Signup;
