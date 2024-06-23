import React from 'react';
import Banner from '../../components/banner/Banner';
import './top-news.css'

interface NewsPanelProps {
  id: number;
  date: string;
  title: string;
  description: string;
  banner: string;
}

const NewsPanel: React.FC<NewsPanelProps> = ({ id, date, title, description, banner}) => {
  return (
    <div className='news-panel'>
      <img src={banner} alt="news-panel__banner" className='news-panel__baner'/>
      <div className='news-panel__text'>
        <div>
          <h3>{date}</h3>
          <div className='news-panel__title'>
            <h2>{title}</h2>
          </div>
          <p>{description}</p>
        </div>
        <h3 className='news_panel__more'>Detaljnije...</h3>
      </div>
    </div>
  );
}

export default NewsPanel;