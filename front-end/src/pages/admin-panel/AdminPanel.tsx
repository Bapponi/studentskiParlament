import React, { useEffect, useState } from 'react';
import './admin-panel.css'
import Banner from '../../components/banner/Banner';
import CreateNews from '../../components/create-news/CreateNews';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import CreatePoll from '../../components/polls/CreatePoll';
import Polls from '../../components/polls/Polls';

function AdminPanel() {

  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useAuth();

  useEffect(() => {
    if(!isLoggedIn){
      navigate('/')
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false)
    navigate('/');
  }

  return (
    <div>
      <Banner title='АДМИН' bannerImg='ztf.png'/>
      <Polls/>
      <div className='admin-panel'>
        <CreatePoll/>
        <CreateNews/>
      </div>
    </div>
  );
}

export default AdminPanel;