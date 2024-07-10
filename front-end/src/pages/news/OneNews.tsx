import React, { useEffect, useState } from 'react';
import Banner from '../../components/banner/Banner';
import './news.css'
import Button from '../../components/button/Button';

interface NewsPanelProps {
  id: number;
  date: string;
  title: string;
  clip: string;
  banner: string;
}

function OneNews() {

  return (
    <div>
      <Banner title='ВЕСТИ' bannerImg='ztf.png'/>
    </div>
  );
}

export default OneNews;