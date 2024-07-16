import React, { useState } from 'react';
import './admin-panel.css'
import Banner from '../../components/banner/Banner';
import CreateNews from '../../components/create-news/CreateNews';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div>
      <Banner title='АДМИН' bannerImg='ztf.png'/>
      <CreateNews/>
      <div onClick={logout}>
        <Button text='Izloguj se'/>
      </div>
    </div>
  );
}

export default AdminPanel;