import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
        <Link to="/" className='nav-page'>ПОЧЕТНА</Link>
        <Link to="/news" className='nav-page'>ВЕСТИ</Link>
        <Link to="/members" className='nav-page'>ЧЛАНОВИ</Link>
        <Link to="/materials" className='nav-page'>МАТЕРИЈАЛИ</Link>
        <Link to="/contact" className='nav-page'>КОНТАКТ</Link>
        <Link to="/links" className='nav-page'>ЛИНКОВИ</Link>
    </div>
  );
}

export default Navbar;