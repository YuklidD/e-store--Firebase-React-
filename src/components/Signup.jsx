import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, db } from '../components/config/Config';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc'; // Importing Google icon from react-icons

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
                // This gives you a Google Access Token. You can use it to access the Google API.
                const user = result.user;
                // Check if user exists in Firestore or add them
                const userRef = doc(db, 'SignedUpUsersData', user.uid);
                return setDoc(userRef, {
                    Name: user.displayName || 'No Name', // Google users have a displayName
                    Email: user.email,
                    Cart: [] // Initialize empty cart or retrieve existing one
                }, { merge: true }); // Use merge true to not overwrite existing data
            })
            .then(() => {
                history.push('/');
                // Update user state here if necessary
            })
            .catch((error) => {
                setError(error.message);
            });
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
            </form>
            <br />
            <button onClick={handleGoogleSignup} className='btn btn-md mybtn' style={{ background: 'transparent', border: '1px solid rgba(0, 0, 0, 0.2)', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <FcGoogle size={24}/> Sign up with Google
            </button>
            {error && <div className='error-msg'>{error}</div>}
            <span>Already have an account? Login 
                <Link to='/login'> Here</Link>
            </span>
        </div>
    );
};

export default Signup;
