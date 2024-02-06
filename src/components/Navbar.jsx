import React, { useContext } from 'react';
import './css/Navigationbar.css'; // Ensure this file is updated as per the CSS below
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/logo.jpeg'; // Adjust the path as necessary
import { auth } from './config/Config';
import { cart as cartIcon } from 'react-icons-kit/entypo/cart';
import { Icon } from 'react-icons-kit';
import { CartContext } from '../global/CartContext';

const Navbar = ({ user }) => {
    const history = useHistory();
    const { totalQty } = useContext(CartContext);

    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        });
    };

    return (
        <nav className='navbox'>
            <div className='leftside'>
                <Link to="/">
                    <img src={logo} alt="Home" className="logo" />
                </Link>
            </div>
            <div className='rightside'>
                {!user ? (
                    <>
                        <Link to="/signup" className='navlink'>SIGN UP</Link>
                        <Link to="/login" className='navlink'>LOGIN</Link>
                    </>
                ) : (
                    <>
                    <Link to="/" className='navlink'>{user}</Link>
                    <Link to="/cartproducts" className='navlink icon'>
                        <Icon size={32} icon={cartIcon} /> {/* Increase size from 24 to 32 or as needed */}
                        {totalQty > 0 && <span className='cart-badge'>{totalQty}</span>}
                    </Link>
                    <button className='logout-btn' onClick={handleLogout}>Logout</button>

                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
