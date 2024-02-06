import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../global/CartContext';
import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import './css/cashout.css';

export const Cashout = () => {
    const history = useHistory();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getDoc(doc(db, 'SignedUpUsersData', user.uid)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setName(snapshot.data().Name);
                        setEmail(snapshot.data().Email);
                    }
                });
            } else {
                history.push('/login');
            }
        });
    }, [auth, db, history]);

    const cashoutSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user) {
            try {
                await addDoc(collection(db, `Buyer-info ${user.uid}`), {
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty,
                    date: new Date()
                });
                setCell('');
                setAddress('');
                dispatch({ type: 'EMPTY' });
                setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds.');
                setTimeout(() => {
                    history.push('/');
                }, 5000);
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className='container mt-5'>
                <h2 className="mb-4">Cashout Details</h2>
                {successMsg && <div className='alert alert-success'>{successMsg}</div>}
                {error && <div className='alert alert-danger'>{error}</div>}
                <form autoComplete="off" onSubmit={cashoutSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Cell No" className="form-label">Cell No</label>
                        <input type="text" className="form-control" onChange={(e) => setCell(e.target.value)} value={cell} placeholder="eg 03123456789" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Delivery Address" className="form-label">Delivery Address</label>
                        <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} value={address} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Price To Pay" className="form-label">Price To Pay</label>
                        <input type="text" className="form-control" value={`Rs ${totalPrice}`} disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Total No of Products" className="form-label">Total No of Products</label>
                        <input type="text" className="form-control" value={totalQty} disabled />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
};
