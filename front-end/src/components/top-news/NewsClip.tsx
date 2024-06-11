import React from 'react';
import './top-news.css'

interface NewsClipProps {
  id: number;
  date: string;
  title: string;
  description: string;
}
  
const NewsClip: React.FC<NewsClipProps> = ({ id, date, title, description}) => {

  return (
    <div className='news-clip'>
        <div>
            <p  className='news-date'>{date}</p>
            <h4 className='news-title'>{title}</h4>
            <p>{description}</p>
        </div>
        <p className='news-details'>Детаљније...</p>
    </div>
  );
}

export default NewsClip;