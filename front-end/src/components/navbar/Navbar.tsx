import React, { useEffect, useState } from 'react';
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setIsAdmin } = useAuth();
  const [adminListToggle, setAdminListToggle] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    setAdminListToggle(false);
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  let menuVisible: boolean = false;
  const toggleMenu = () => {
    if (!menuVisible) {
      document.querySelector('.top')?.classList.add('active');
      document.querySelector('.center')?.classList.add('active');
      document.querySelector('.bottom')?.classList.add('active');
      document.querySelector('.mobile-menu__container')?.classList.add('active');
      document.querySelector('.mobile-menu__shadow')?.classList.add('active');
      document.body.classList.add('stop-scrolling');
    } else {
      document.querySelector('.top')?.classList.remove('active');
      document.querySelector('.center')?.classList.remove('active');
      document.querySelector('.bottom')?.classList.remove('active');
      document.querySelector('.mobile-menu__container')?.classList.remove('active');
      document.querySelector('.mobile-menu__shadow')?.classList.remove('active');
      document.body.classList.remove('stop-scrolling');
    }

    menuVisible = !menuVisible;
  };

  const handleAdminIconClick = () => {
    setAdminListToggle(!adminListToggle);
  };

  const handleShadowClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLDivElement && event.target.classList.contains('mobile-menu__shadow')) {
      toggleMenu();
    }
  };

  return (
    <header className='nav-bar'>
      <a href='/' className='logo-part'>
        <img src='../etf-logo.png' alt='etf-logo' className='etf-logo' />
        <div>
          <h4>СТУДЕНТСКИ ПАРЛАМЕНТ</h4>
          <h4 style={{ color: 'var(--primary-color)' }}>ЕЛЕКТРОТЕХНИЧКОГ ФАКУЛТЕТА</h4>
          <h4 style={{ fontWeight: '400' }}>УНИВЕРЗИТЕТА У БЕОГРАДУ</h4>
        </div>
      </a>
      <nav className='link-bar'>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
          ПОЧЕТНА
        </NavLink>
        <NavLink to='/news' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
          ВЕСТИ
        </NavLink>
        <NavLink to='/members' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
          ЧЛАНОВИ
        </NavLink>
        <NavLink to='/materials' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
          МАТЕРИЈАЛИ
        </NavLink>
        <NavLink to='/links' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
          ЛИНКОВИ
        </NavLink>
        {isLoggedIn && (
          <div className='nav-admin'>
            <img src='../user.png' alt='admin' className='admin-icon' onClick={handleAdminIconClick} />
            {adminListToggle && (
              <div className='admin-list'>
                <NavLink to='/user-panel' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')} onClick={handleAdminIconClick}>
                  КОРИСНИЧКИ ПАНЕЛ
                </NavLink>
                <div className='nav-page' onClick={logout}>
                  ОДЈАВИ СЕ
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
      <div className='nav-mobile' onClick={toggleMenu}>
        <div className='burger-bar top'></div>
        <div className='burger-bar center'></div>
        <div className='burger-bar bottom'></div>
      </div>
      <div className='mobile-menu__shadow' onClick={handleShadowClick}>
        <div className='mobile-menu__container' onClick={(e) => e.stopPropagation()}>
          <nav className='mobile-menu'>
            <div className='mobile-menu__links'>
              <NavLink to='/' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
                <div onClick={toggleMenu}>
                  ПОЧЕТНА
                </div>
              </NavLink>
              <NavLink to='/news' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
                <div onClick={toggleMenu}>
                  ВЕСТИ
                </div>
              </NavLink>
              <NavLink to='/members' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
                <div onClick={toggleMenu}>
                  ЧЛАНОВИ
                </div>
              </NavLink>
              <NavLink to='/materials' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
                <div onClick={toggleMenu}>
                  МАТЕРИЈАЛИ
                </div>
              </NavLink>
              <NavLink to='/links' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
                <div onClick={toggleMenu}>
                  ЛИНКОВИ
                </div>
              </NavLink>
              {isLoggedIn && (
                <div className='admin-list__mobile'>
                  <NavLink to='/user-panel' className={({ isActive }) => (isActive ? 'nav-page active' : 'nav-page')}>
                    <div onClick={toggleMenu}>
                      КОРИСНИЧКИ ПАНЕЛ
                    </div>
                  </NavLink>
                  <div className='nav-page' onClick={logout} style={{ alignSelf: 'flex-start' }}>
                    ОДЈАВИ СЕ
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
