import React, { useState } from 'react';
import Banner from '../../components/banner/Banner';
import './news.css'
import NewsPanel from '../../components/top-news/NewsPanel';
import Button from '../../components/button/Button';

interface NewsPanelProps {
  id: number;
  date: string;
  title: string;
  description: string;
  banner: string;
}

function News() {

  const news: NewsPanelProps[] = [
    {
      id: 1,
      date: '26. 03. 2024.',
      title: 'Одлука о расписивању избора за школску 2024-2025',
      description: 'Одлука о Избору за Студентски парламент и студента продекана Електротехничког факултета у Београду и делегате у Студентском парламенту Универзитета у Београду за школску 2024-2025',
      banner: 'ztf.png'
    },
    {
      id: 2,
      date: '15. 04. 2024.',
      title: 'Одлука о отказивању избора',
      description: 'Детаљи одлуке о отказивању избора са седнице одржане 13. априла 2024. године.',
      banner: 'ztf.png'
    },
    {
      id: 3,
      date: '26. 03. 2024.',
      title: 'Одлука о расписивању избора за школску 2024-2025',
      description: 'Одлука о Избору за Студентски парламент и студента продекана Електротехничког факултета у Београду и делегате у Студентском парламенту Универзитета у Београду за школску 2024-2025',
      banner: 'ztf.png'
    },
    {
      id: 4,
      date: '15. 04. 2024.',
      title: 'Одлука о отказивању избора',
      description: 'Детаљи одлуке о отказивању избора са седнице одржане 13. априла 2024. године.',
      banner: 'ztf.png'
    },
    {
      id: 5,
      date: '26. 03. 2024.',
      title: 'Одлука о расписивању избора за школску 2024-2025',
      description: 'Одлука о Избору за Студентски парламент и студента продекана Електротехничког факултета у Београду и делегате у Студентском парламенту Универзитета у Београду за школску 2024-2025',
      banner: 'ztf.png'
    },
    {
      id: 6,
      date: '15. 04. 2024.',
      title: 'Одлука о отказивању избора',
      description: 'Детаљи одлуке о отказивању избора са седнице одржане 13. априла 2024. године.',
      banner: 'ztf.png'
    }
  ];

  const getMoreNews = () => {
    console.log("Hvata")
  }

  return (
    <div>
      <Banner title='ВЕСТИ' bannerImg='ztf.png'/>
      <div className='all-news'>
      {news.map((entry, index) => (
          <NewsPanel 
            key={index}
            id={entry.id}
            date={entry.date}
            title={entry.title}
            description={entry.description}
            banner={entry.banner}
          />
        ))}
        <div className='all-news__button' onClick={getMoreNews}>
          <Button text='Учитај још вест'/>
        </div>
        
      </div>
      
    </div>
  );
}

export default News;