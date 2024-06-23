import React from 'react';
import Banner from '../../components/banner/Banner';
import './top-news.css'

function NewsPanel() {
  return (
    <div className='news-panel'>
      <img src="ztf.png" alt="news-panel__banner" className='news-panel__baner'/>
      <div className='news-panel__text'>
        <div>
          <h3>26. 03. 2024.</h3>
          <h2 style={{color: 'var(--primary-color)'}}>Одлука о расписивању избора за школску 2024-2025</h2>
          <p>Одлука о Избору за Студентски парламент и студента продекана Електротехничког факултета у Београду и делегате у Студентском парламенту Универзитета у Београду за школску 2024-2025</p>
        </div>
        <h3 className='news_panel__more'>Detaljnije...</h3>
      </div>
    </div>
  );
}

export default NewsPanel;