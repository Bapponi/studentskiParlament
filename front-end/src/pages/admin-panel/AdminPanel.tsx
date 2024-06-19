import React, { useState } from 'react';
import './admin-panel.css'
import Banner from '../../components/banner/Banner';
import NewElementButton from '../../components/new-element__button/NewElementButton';

function AdminPanel() {

  return (
    <div>
      <Banner title='АДМИН' bannerImg='ztf.png'/>
      <NewElementButton/>
    </div>
  );
}

export default AdminPanel;