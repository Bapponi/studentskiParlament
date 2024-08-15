import React, { useEffect, useState } from 'react';
import './top-news.css';
import NewsClip from './NewsClip';
import { useNews } from '../../hooks/newsHooks/useNews';
import { MessageBoxTypes, NewsProps } from '../../pages/news/helpers';
import MessageBox from '../message-box/MessageBox';

interface NewsClipProps {
  id: number;
  date: string;
  title: string;
  clip: string;
  banner: string;
}

function TopNews() {

  const limit = 2;
  const offset = 0;
  const {data, isLoadingFetch, fetchError} = useNews(limit, offset);
  const { news = [] } = data || {};

  return (
    <div className='top-news'>
      <div className='top-news__title'>
        <h2>НАЈНОВИЈЕ ВЕСТИ</h2>
      </div>
      <div className='the-top__news'>
        {news && news.map((entry) => (
          <NewsClip 
            key={entry.id}
            id={entry.id}
            date={entry.date}
            title={entry.title}
            description={entry.clip}
          />
        ))}
      </div>
      {(fetchError) && 
        <MessageBox text={fetchError} infoType={MessageBoxTypes.Error}/>
      }
      {isLoadingFetch && <MessageBox text='Учитавају се вести...' infoType={MessageBoxTypes.Loading}/>}
    </div>
  );
}

export default TopNews;
