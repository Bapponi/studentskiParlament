import React from 'react';
import './top-news.css'
import { Link } from 'react-router-dom';

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
        <Link to={`/news/${id}`} className='news_panel__more'>
          <h3>Детаљније...</h3>
        </Link>
    </div>
  );
}

export default NewsClip;