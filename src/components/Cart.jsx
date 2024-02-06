import React, { useContext, useEffect } from 'react';
import { CartContext } from '../global/CartContext';
import Navbar from './Navbar';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './config/Config';
import './css/cart.css'; 

const Cart = ({ user }) => {
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(currentUser => {
            if (!currentUser) {
                history.push('/login');
            }
        });
    }, [history]);

    return (
        <>
            <Navbar user={user} />
            <div className="container py-5">
                <h1 className="mb-4">Your Cart</h1>
                <div className="row gy-4">
                    {shoppingCart.map(cartItem => (
                        <div className="col-md-4 d-flex" key={cartItem.ProductID}>
                            <div className="card flex-grow-1">
                                <img src={cartItem.product_img} className="card-img-top" alt={cartItem.product_name} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{cartItem.product_name}</h5>
                                    <p className="card-text">Price: Rs {cartItem.product_price}</p>
                                    <div className="mt-auto">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button className="btn btn-outline-primary btn-sm" onClick={() => dispatch({ type: 'DEC', id: cartItem.ProductID, cart: cartItem })}>
                                                <Icon icon={ic_remove} size={16} />
                                            </button>
                                            <span className="btn btn-light">{cartItem.qty}</span>
                                            <button className="btn btn-outline-primary btn-sm" onClick={() => dispatch({ type: 'INC', id: cartItem.ProductID, cart: cartItem })}>
                                                <Icon icon={ic_add} size={16} />
                                            </button>
                                        </div>
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => dispatch({ type: 'DELETE', id: cartItem.ProductID, cart: cartItem })}>
                                            <Icon icon={iosTrashOutline} size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {shoppingCart.length > 0 && (
                    <div className="card mt-5">
                        <div className="card-body">
                            <h5 className="card-title">Cart Summary</h5>
                            <p className="card-text">Total Price: Rs {totalPrice}</p>
                            <p className="card-text">Total Quantity: {totalQty}</p>
                            <Link to="cashout" className="btn btn-primary">Proceed to Checkout</Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
