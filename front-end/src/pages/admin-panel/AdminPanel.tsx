import React from 'react';
import './admin-panel.css'
import Banner from '../../components/banner/Banner';
import NewElementButton from '../../components/new-element__button/NewElementButton';

function AdminPanel() {
  return (
    <div>
      <Banner title='АДМИН' bannerImg='ztf.png'/>
      <div className='create-news'>
        <h1>Креирај нову вест</h1>
        <NewElementButton/>
      </div>
    </div>
  );
}

export default AdminPanel;