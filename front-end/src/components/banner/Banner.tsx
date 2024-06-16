import React from 'react';
import './banner.css';

interface BannerProps {
  title: string;
  bannerImg: string;
}

const Banner: React.FC<BannerProps> = ({ title, bannerImg }) => {
  return (
    <div className='banner'>
      <div className='banner-filter'/>
      <div className='banner-text'>
        <p><b>{title}</b></p>
      </div>  
      <img src={bannerImg} alt="ztf" className='banner-image'/>
    </div>
  );
}

export default Banner;