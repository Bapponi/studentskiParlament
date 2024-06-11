import React from 'react';
import Banner from '../../components/banner/Banner';
import About from '../../components/about/About';
import './home.css'
import TopNews from '../../components/top-news/TopNews';

function Home() {
  return (
    <div>
      <Banner/>
      <div className='home-main'>
        <About/>
        <TopNews/>
      </div>
    </div>
  );
}

export default Home;