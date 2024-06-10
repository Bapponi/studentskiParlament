import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className='nav-bar'>
      <a href='/' className='logo-part'>
        <img src="etf-logo.png" alt="etf-logo" className='etf-logo' />
        <div>
          <h4>СТУДЕНТСКИ ПАРЛАМЕНТ</h4>
          <h4 style={{color: "var(--primary-color)"}}>ЕЛЕКТРОТЕХНИЧКОГ ФАКУЛТЕТА</h4>
          <h4 style={{fontWeight: "400"}}>УНИВЕРЗИТЕТА У БЕОГРАДУ</h4>         
        </div>
      </a>
      <nav className='link-bar'>
        <Link to="/" className='nav-page'>ПОЧЕТНА</Link>
        <Link to="/news" className='nav-page'>ВЕСТИ</Link>
        <Link to="/members" className='nav-page'>ЧЛАНОВИ</Link>
        <Link to="/materials" className='nav-page'>МАТЕРИЈАЛИ</Link>
        <Link to="/contact" className='nav-page'>КОНТАКТ</Link>
        <Link to="/links" className='nav-page'>ЛИНКОВИ</Link>
      </nav>
    </header>
  );
}

export default Navbar;