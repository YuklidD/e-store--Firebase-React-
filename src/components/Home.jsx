import React,{useEffect, useState} from 'react'
import Navbar from './Navbar'
import Products from './Products'
import './css/Home.css';
import { auth } from './config/Config';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export const Home = ({ user }) => {

  const history = useHistory();

  useEffect(() => {
      // forcing user to signup
      auth.onAuthStateChanged(user => {
          if (!user) {
              history.push('/login');
          }
      })
  })

  return (
      <div className='wrapper'>
          <Navbar user={user} />
          <Products />
      </div>
  )
}

export default Home
