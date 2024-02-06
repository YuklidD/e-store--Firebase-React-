import React, { useContext, useEffect } from 'react';
import { CartContext } from '../global/CartContext';
import Navbar from './Navbar';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { Link, useHistory } from 'react-router-dom'; // Combined imports for react-router-dom
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
            {shoppingCart.length !== 0 && <h1>Cart</h1>}
            <div className='cart-container'>
                {shoppingCart.length === 0 && (
                    <>
                        <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                        <div><Link to="/">Return to Home page</Link></div>
                    </>
                )}
                {shoppingCart.map(cartItem => (
                    <div className='cart-card' key={cartItem.ProductID}>
                        <div className='cart-img'>
                            <img src={cartItem.product_img} alt={cartItem.product_name} /> {/* Corrected the property names */}
                        </div>
                        <div className='cart-name'>{cartItem.product_name}</div> {/* Corrected the property names */}
                        <div className='cart-price-orignal'>Rs {cartItem.product_price}.00</div> {/* Corrected the property names */}
                        <div className='inc' onClick={() => dispatch({ type: 'INC', id: cartItem.ProductID, cart: cartItem })}>
                            <Icon icon={ic_add} size={24} />
                        </div>
                        <div className='quantity'>{cartItem.qty}</div>
                        <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cartItem.ProductID, cart: cartItem })}>
                            <Icon icon={ic_remove} size={24} />
                        </div>
                        <div className='cart-price'>
                            Rs {cartItem.TotalProductPrice}.00
                        </div>
                        <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cartItem.ProductID, cart: cartItem })}>
                            <Icon icon={iosTrashOutline} size={24} />
                        </button>
                    </div>
                ))}
                {shoppingCart.length > 0 && (
                    <div className='cart-summary'>
                        <div className='cart-summary-heading'>Cart-Summary</div>
                        <div className='cart-summary-price'>
                            <span>Total Price</span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Qty</span>
                            <span>{totalQty}</span>
                        </div>
                        <Link to='cashout' className='cashout-link'>
                            <button className='btn btn-success btn-md' style={{ marginTop: '5px' }}>
                                Cash on delivery
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
