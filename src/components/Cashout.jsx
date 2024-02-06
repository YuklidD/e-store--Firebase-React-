import { useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { CartContext } from '../global/CartContext';
import Navbar from './Navbar';
import { useHistory } from 'react-router-dom';

export const Cashout = (props) => {
    const history = useHistory();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const auth = getAuth(); // Initialize Firebase Auth
    const db = getFirestore(); // Initialize Firestore Database

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = doc(db, 'SignedUpUsersData', user.uid);
                getDoc(userRef).then((snapshot) => {
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
            const date = new Date();
            const time = date.getTime();
            try {
                await addDoc(collection(db, `Buyer-info ${user.uid}`), {
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty
                });
                setCell('');
                setAddress('');
                dispatch({ type: 'EMPTY' });
                setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds');
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
            <Navbar user={props.user} />
            <div className='container'>
                <br />
                <h2>Cashout Details</h2>
                <br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' required
                        value={name} disabled />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        value={email} disabled />
                    <br />
                    <label htmlFor="Cell No">Cell No</label>
                    <input type="number" className='form-control' required
                        onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
                    <br />
                    <label htmlFor="Delivery Address">Delivery Address</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br />
                    <label htmlFor="Price To Pay">Price To Pay</label>
                    <input type="number" className='form-control' required
                        value={totalPrice} disabled />
                    <br />
                    <label htmlFor="Total No of Products">Total No of Products</label>
                    <input type="number" className='form-control' required
                        value={totalQty} disabled />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    )
}