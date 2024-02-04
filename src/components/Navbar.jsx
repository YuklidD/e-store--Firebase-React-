import React from 'react';
import './css/Navigationbar.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../assets/logo.jpeg'; // Adjust the path as necessary
import { auth } from './config/Config';
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Navbar = ({user}) => {

  const history = useHistory();

  // handle logout
  const handleLogout = () => {
      auth.signOut().then(() => {
          history.push('/login');
      })
  }
  return (
    <div className='navbox'>
    <div className='leftside'>
        <img src={logo} alt="" />
    </div>
    {!user && <div className='rightside'>
        <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
        <span><Link to="login" className='navlink'>LOGIN</Link></span>
    </div>}
    {user && <div className='rightside'>
        <span><Link to="/" className='navlink'>{user}</Link></span>
        <span><Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
        <span className='no-of-products'>0</span>
        <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
    </div>}
</div>
  );
}

export default Navbar;

