import React, { useState } from 'react';
import './admin-panel.css'
import Banner from '../../components/banner/Banner';
import CreateNews from '../../components/create-news/CreateNews';

function AdminPanel() {

  return (
    <div>
      <Banner title='АДМИН' bannerImg='ztf.png'/>
      <CreateNews/>
    </div>
  );
}

export default AdminPanel;