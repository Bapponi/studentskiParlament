import React from 'react';
import Banner from '../../components/banner/Banner';
import './news.css'
import NewsPanel from '../../components/top-news/NewsPanel';
import Button from '../../components/button/Button';

function News() {
  return (
    <div>
      <Banner title='ВЕСТИ' bannerImg='ztf.png'/>
      <div className='all-news'>
        <NewsPanel/>
        <NewsPanel/>
        <NewsPanel/>
        <NewsPanel/>
        <NewsPanel/>
        <NewsPanel/>
        <div className='all-news__button'>
          <Button text='Учитај још вест'/>
        </div>
        
      </div>
      
    </div>
  );
}

export default News;