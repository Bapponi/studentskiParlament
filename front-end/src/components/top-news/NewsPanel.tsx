import React from 'react';
import Banner from '../../components/banner/Banner';
import './top-news.css'
import { Link } from 'react-router-dom';

interface NewsPanelProps {
  id: number;
  date: string;
  title: string;
  clip: string;
  banner: string;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ id, date, title, clip, banner}) => {
  return (
    <div className='news-panel'>
      <img src={banner} alt="news-panel__banner" className='news-panel__baner'/>
      <div className='news-panel__text'>
        <div>
          <h3>{date}</h3>
          <div className='news-panel__title'>
            <h2>{title}</h2>
          </div>
          <p>{clip}</p>
        </div>
        <Link to={`/news/${id}`} className='news_panel__more'>
          <h3>Detaljnije...</h3>
        </Link>
      </div>
    </div>
  );
}

export default NewsPanel;