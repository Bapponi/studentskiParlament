import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {

  let menuVisible: boolean = false
  const toggleMenu = () => {
    if (!menuVisible) {
      document.querySelector('.top')?.classList.add('active')
      document.querySelector('.center')?.classList.add('active')
      document.querySelector('.bottom')?.classList.add('active')
      document.querySelector('.mobile-menu__container')?.classList.add('active')
      document.querySelector('.mobile-menu__shadow')?.classList.add('active')
      document.body.classList.add("stop-scrolling");
    } else {
      document.querySelector('.top')?.classList.remove('active')
      document.querySelector('.center')?.classList.remove('active')
      document.querySelector('.bottom')?.classList.remove('active')
      document.querySelector('.mobile-menu__container')?.classList.remove('active')
      document.querySelector('.mobile-menu__shadow')?.classList.remove('active')
      document.body.classList.remove("stop-scrolling");
    }

    menuVisible = !menuVisible
  }

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
      <div className="nav-mobile" onClick={toggleMenu}>
        <div className="burger-bar top"></div>
        <div className="burger-bar center"></div>
        <div className="burger-bar bottom"></div>
      </div>
      <div className="mobile-menu__shadow">
        <div className="mobile-menu__container">
          <nav className="mobile-menu">
            <div className="mobile-menu-links">
              <Link to="/" className='nav-page'>ПОЧЕТНА</Link>
              <Link to="/news" className='nav-page'>ВЕСТИ</Link>
              <Link to="/members" className='nav-page'>ЧЛАНОВИ</Link>
              <Link to="/materials" className='nav-page'>МАТЕРИЈАЛИ</Link>
              <Link to="/contact" className='nav-page'>КОНТАКТ</Link>
              <Link to="/links" className='nav-page'>ЛИНКОВИ</Link>
            </div>
          </nav>
        </div>
      </div>
      
    </header>
  );
}

export default Navbar;