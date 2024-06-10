import React from 'react';
import './banner.css';

function Banner() {
  return (
    <div className='banner'>
      <div className='banner-filter'/>
      <div className='banner-text'>
        <p><b>ДОБРОДОШЛИ</b></p>
      </div>  
      <img src="ztf.png" alt="ztf" className='banner-image'/>
    </div>
  );
}

export default Banner;